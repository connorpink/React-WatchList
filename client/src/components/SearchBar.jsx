import "../styles/search.css"
import { useNavigate } from 'react-router-dom';

// import axios from 'axios';
import { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';


export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    function handleSearch() {
        navigate(`/search?SearchTerm=${searchTerm}`);
    }


    function handleIconClick() {
        setModalOpen(!modalOpen);
        console.log('clicked');
    }
    return (
        <>
            <div className="searchDiv">
                <input id="searchBar" type="text" placeholder="Search..." onChange={(event) => { setSearchTerm(event.target.value.toLowerCase()) }} onKeyDown={(event) => { if (event.key === 'Enter') { handleSearch() } }}
                />
                <button id="searchButton" className="btn btn-primary" onClick={() => handleSearch()}>Search</button>
            </div >
            <div className="searchIcon">
                <a href='#' onClick={handleIconClick}>
                    <i className="fas fa-search"></i>
                </a>
            </div>

            {modalOpen && (
                // modal content
                <Modal isOpen={modalOpen} toggle={handleIconClick}>
                    <ModalHeader toggle={handleIconClick}>Search</ModalHeader>
                    <ModalBody>
                        {/* your search bar functionality goes here */}
                        <div className="modalSearch">
                            <input id="searchBar" type="text" placeholder="Search..." onChange={(event) => { setSearchTerm(event.target.value.toLowerCase()) }} onKeyDown={(event) => { if (event.key === 'Enter') { handleSearch(); handleIconClick(); } }} />
                            <button id="searchButton" className="btn btn-primary" onClick={() => { handleSearch(); handleIconClick(); }}>Search</button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleIconClick}>Close</Button>
                    </ModalFooter>
                </Modal>
            )}

        </>
    )
}
