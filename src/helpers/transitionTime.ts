const transitionTimeStyle = getComputedStyle(document.documentElement).getPropertyValue('--transition-time')
const transitionTime = Number(transitionTimeStyle.slice(0, -1)) * 1000

export default transitionTime
