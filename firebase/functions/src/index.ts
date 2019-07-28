import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const manageStock = functions.firestore
	.document('transaction/{transactionId}')
	.onCreate((snapshot, context) => {
		const data = snapshot.data();
		const promises: Promise<any>[] = [];
		if (data === undefined) return;
		data.products.forEach(async (element: { id: string; quantity: number }) => {
			const promise =
				data.type === 'Purchase'
					? addStock(element.id, element.quantity)
					: subtractStock(element.id, element.quantity);
			if (promise !== null) promises.push(promise);
		});
		return Promise.all(promises);
	});

export const transactionDeleted = functions.firestore
	.document('transaction/{transactionId}')
	.onDelete((snapshot, context) => {
		const data = snapshot.data();
		const promises: Promise<any>[] = [];
		if (data === undefined) return;
		data.products.forEach(async (element: { id: string; quantity: number }) => {
			const promise =
				data.type === 'Purchase'
					? subtractStock(element.id, element.quantity)
					: addStock(element.id, element.quantity);
			if (promise !== null) promises.push(promise);
		});
		return Promise.all(promises);
	});

export const transactionUpdated = functions.firestore
	.document('transaction/{transactionId}')
	.onUpdate((change, context) => {
		const after = change.after;
		const before = change.before;
		if (after === before) {
			return;
		}

		const promises: Promise<any>[] = [];
		const data = after.data();
		const preData = before.data();
		if (data === undefined) return;
		if (preData === undefined) {
			data.products.forEach(
				async (element: { id: string; quantity: number }) => {
					const promise =
						data.type === 'Purchase'
							? addStock(element.id, element.quantity)
							: subtractStock(element.id, element.quantity);
					if (promise !== null) promises.push(promise);
				}
			);
		} else {
			data.products.forEach((element: { id: string; quantity: number }) => {
				preData.products.forEach((val: { id: string; quantity: number }) => {
					const quantity = element.quantity - val.quantity;
					const promise =
						data.type === 'Purchase'
							? addStock(element.id, quantity)
							: subtractStock(element.id, quantity);
					if (promise !== null) promises.push(promise);
				});
			});
		}
		return Promise.all(promises);
	});

async function addStock(id: string, quantity: number): Promise<any> {
	const ref = admin.firestore().doc(`product/${id}`);
	const refData = await ref.get();
	const product = refData.data();
	if (product === undefined) return;
	return ref.update({
		quantity: product.quantity + quantity
	});
}

async function subtractStock(id: string, quantity: number): Promise<any> {
	const ref = admin.firestore().doc(`product/${id}`);
	const refData = await ref.get();
	const product = refData.data();
	if (product === undefined) return;
	return ref.update({
		quantity: product.quantity - quantity
	});
}
