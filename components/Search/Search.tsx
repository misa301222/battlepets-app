import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";

interface SearchResult {
    name: string,
    imageURL: string,
    type: string
}

async function searchPetAndUser(search: string) {
    const response = await fetch(`/api/searchPetAndUser/${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

function Search() {
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>();

    const handleOnSubmitSearchForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const responseSearch = await searchPetAndUser(search);
        console.log(responseSearch);
        if (responseSearch.resultsPets) {
            setSearchResults(responseSearch.resultsPets);
        }

        //TODO APPEND THIS TOO
        if (responseSearch.resultsUsers) {
            //setSearchResults(prev => ([...prev, responseSearch.resultsUsers]));
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Search <FontAwesomeIcon icon={faSearch} /></h1>
                <hr />
            </div>

            <form onSubmit={handleOnSubmitSearchForm} className="card w-1/2 mx-auto">
                <div className="flex flex-row items-baseline">
                    <div className="w-1/3">
                        <h5>Pet Name / User</h5>
                    </div>

                    <div className="w-2/3">
                        <input onChange={(e) => setSearch(e.target.value)} className="form-control" type={'text'} />
                    </div>

                    <div className="w-1/3 text-center">
                        <button type="submit" className="w-20 btn-primary"><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
            </form>

            <div>
                {
                    JSON.stringify(searchResults)
                }
            </div>
        </div>
    )
}

export default Search;