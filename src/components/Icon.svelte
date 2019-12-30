<script>
	export let fontSize = '1.5rem';
</script>

<i class='material-icons-outlined' style='font-size: {fontSize} !important;'>
	<slot></slot>
</i>

<style>
   i.material-icons-outlined {
		display: inline-block;
		color: inherit;
	}
</style>
