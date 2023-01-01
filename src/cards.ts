import { type Readable, writable } from 'svelte/store'

export class Card {
  readonly id: number
  readonly type: string
  dateModified: number
  #state: string
  #tags: string[]
  #content: string

  constructor(id: number, type: string, dateModified: number, state: string, tags: string[], content: string) {
    this.id = id
    this.type = type
    this.dateModified = dateModified
    this.#state = state
    this.#tags = tags
    this.#content = content
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      dateModified: this.dateModified,
      state: this.state,
      tags: this.tags,
      content: this.content,
    }
  }

  modified() {
    this.dateModified = Date.now()
  }

  get state(): string {
    return this.#state
  }
  set state(value: string) {
    this.#state = value
    this.modified()
  }

  get tags(): string[] {
    return this.#tags
  }
  set tags(value: string[]) {
    this.#tags = value
    this.modified()
  }

  get content(): string {
    return this.#content
  }
  set content(value: string) {
    this.#content = value
    this.modified()
  }
}

export interface CardStore extends Readable<Card[]> {
  getIndex(cards: Card[], id: Card['id']): number
  create(type: Card['type']): number
  update(id: Card['id'], updater: (card: Card) => Card): void
  remove(id: Card['id']): void
}

const createCardsStore = (): CardStore => {
  const localStorageKey = 'cards'

  const parseLocalStorage = (storageKey: string, fallbackValue = '[]'): Card[] => {
    const localStorageCards: string = localStorage.getItem(storageKey) ?? fallbackValue

    return JSON.parse(localStorageCards).map((card: Card) => {
      return new Card(card.id, card.type, card.dateModified, card.state, card.tags, card.content)
    })
  }

  const { subscribe, update } = writable(parseLocalStorage(localStorageKey))

  subscribe((cards) => localStorage.setItem(localStorageKey, JSON.stringify(cards)))

  return {
    subscribe,

    getIndex: (cards: Card[], id: Card['id'] = -1): number => {
      return cards.findIndex((card) => card.id === id)
    },

    create: (type: Card['type'] = 'text'): number => {
      const createDate = Date.now()

      update((cards) => [new Card(createDate, type, createDate, 'active', [], ''), ...cards])

      return createDate
    },

    update(id: Card['id'] = -1, updater: (card: Card) => Card) {
      update((cards) => {
        const index = cards.findIndex((card) => card.id === id)

        cards[index] = updater(cards[index])
        cards.sort((a, b) => b.dateModified - a.dateModified)

        return cards
      })
    },

    remove: (id: Card['id'] = -1): void => {
      update((cards) => cards.filter((card: Card) => card.id !== id))
    },
  }
}

export const cards = createCardsStore()
