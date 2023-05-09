<script>
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
    import { CURRENT_TAB } from "$lib/stores/store";
</script>


<TabGroup class="h-full">
    <Tab bind:group={$CURRENT_TAB} name="item" on:click={()=>{location.href = '/item'}} value={0}>Item</Tab>
    <Tab bind:group={$CURRENT_TAB} name="stores" on:click={()=>{location.href = '/store'}} value={1}>Stores</Tab>
    <Tab bind:group={$CURRENT_TAB} name="warehouse" on:click={()=>{location.href = '/warehouse'}} value={2}>Warehouse</Tab>
    <Tab bind:group={$CURRENT_TAB} name="staff" on:click={()=>{location.href = '/staff'}} value={3}>Staff</Tab>
    <Tab bind:group={$CURRENT_TAB} name="order" on:click={()=>{location.href = '/order'}} value={4}>Order</Tab>

</TabGroup>