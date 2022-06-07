import { useState } from "react";

interface Items {
    itemName: string,
    itemDescription: string,
    itemPrice: number,
    itemRarity: number,
    itemType: string,
    imageURL: string
}

function ManageItems({ data }: any) {
    const [items, setItems] = useState<Items[]>(data.items as Items[]);

    return (
        <div>
            {
                JSON.stringify(items)
            }
        </div>
    )
}

export default ManageItems;