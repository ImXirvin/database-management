
interface Permissions {
	[role: string]: {
		[filename: string]: string[];
	};
}

const PERMISSIONS: Permissions = {
	['Corporate']: {
		['item']: [
			'item_name',
			'description',
			'item_price',
			'sku'
		],

		['order']: ['order_name', 'order_id', 'store_id', 'order_date', 'status', 'delivery_ets'],

		['store']: ['store_id', 'store_address', 'postcodes', 'warehouse_id', 'stock'],

		['warehouse']: [
			'warehouse_number',
			'warehouse_id',
			'warehouse_address',
			'cargo_arrival',
			'shipment_errors',
			'customer_rating',
			'total_capacity',
			'remaining_capacity',
			'store_id',
			'sku'
		],

		['staff']: [
			'store_id',
			'staff_id',
			'first_name',
			'last_name',
			'date_of_birth',
			'role',
			'authorised',
			'tenure',
			'annual salary'
		]
	},
};

export default PERMISSIONS;