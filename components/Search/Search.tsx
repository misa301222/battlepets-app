import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";
import SearchResultCard from "../Cards/SearchResultCard";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

interface SearchResult {
    _id: string,
    name: string,
    imageURL: string,
    email?: string,
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
    const [searchResults, setSearchResults] = useState<SearchResult[]>();
    const router = useRouter();

    const handleOnClickSearchResultCard = (element: SearchResult) => {
        switch (element.type) {
            case 'USER':
                router.push(`/seeUserProfile/${element.email}`);
                break;

            case 'PET':
                router.push(`/viewPet/${element._id}`);
                break;
        }
    }

    const handleOnSubmitSearchForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const responseSearch = await searchPetAndUser(search);
        let searchResultsArray: SearchResult[] = [];
        // console.log(responseSearch);
        if (responseSearch.resultsPets) {
            for (let i = 0; i < responseSearch.resultsPets[0].length; i++) {
                responseSearch.resultsPets[0][i].type = 'PET';
                console.log(responseSearch.resultsPets[0][i]);
                searchResultsArray.push(responseSearch.resultsPets[0][i]);
            }
        }

        if (responseSearch.resultsUsers) {
            for (let i = 0; i < responseSearch.resultsUsers[0].length; i++) {
                responseSearch.resultsUsers[0][i].type = 'USER';
                searchResultsArray.push(responseSearch.resultsUsers[0][i]);
            }
        }
        console.log(searchResultsArray);
        setSearchResults(searchResultsArray);
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
                        <input onChange={(e) => setSearch(e.target.value)} className="form-control" type={'text'} placeholder={'Type what you want to search...'} />
                    </div>

                    <div className="w-1/3 text-center">
                        <button type="submit" className="w-20 btn-primary"><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
            </form>

            <div className="w-4/5 mx-auto flex flex-wrap gap-10">
                {
                    searchResults?.map((element: SearchResult, index: number) => (
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            key={index} className="mt-10 cursor-pointer"
                            onClick={() => handleOnClickSearchResultCard(element)}>
                            <SearchResultCard element={element} />
                        </motion.div>
                    ))
                }

            </div>
        </div>
    )
}

export default Search;