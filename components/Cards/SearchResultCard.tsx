function SearchResultCard({ element }: any) {
    return (
        <div className="card w-[25rem] h-[25rem]">
            <div className="flex flex-col">
                <div>
                    <h5 className="text-center">{element.type}</h5>
                    <h3 className="text-center">{element.type === 'USER' ? element.fullName : element.name}</h3>
                </div>

                <div>
                    <div style={{
                        backgroundImage: `url(${element.imageURL})`,
                        backgroundPosition: 'center',
                        width: '10rem',
                        height: '10rem',
                        backgroundSize: 'cover',
                        margin: '0 auto',
                        marginTop: '1rem'
                    }} />
                </div>
            </div>
        </div>
    )
}

export default SearchResultCard;