<script lang="ts">

    export let form;
</script>





<div class="w-full h-full grid place-items-center">

    <form method="POST" action="/login" class="card variant-filled-surface p-4 gap-4 flex flex-col items-center justify-center">
        <label class="label px-4">
            <span class="ml-4">Email Address</span>
            <input name="email" class="input px-4 py-2" type="email" placeholder="Email Address" />
        </label>

        <label class="label px-4 w-full">
            <span class="ml-4">Password</span>
            <input name="password" class="input px-4 py-2" type="password" placeholder="password" />
        </label>

        {#if form?.invalid} 
            <div class="text-red-500 text-sm font-medium">
                Input is not valid
            </div>
        {/if}

        <button class="btn variant-filled-primary px-4 py-2 w-fit" type="submit">Sign In</button>
    </form>


</div>