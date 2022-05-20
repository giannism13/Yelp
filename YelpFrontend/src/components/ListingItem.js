function ListingItem(props) {
    return (
        <div>
            <h1>{props.listingItem.name}</h1>
            <h2>{props.listingItem.latitude}</h2>
        </div >
    )
}

export default ListingItem;