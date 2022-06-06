function ViewStores({ data }: any) {
    return (
        <div>
            {
                JSON.stringify(data)
            }
            stores
        </div>
    )
}

export default ViewStores;