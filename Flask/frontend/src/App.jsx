import './App.css'
import {useEffect, useState} from "react";
import ContactList from "./ContactList.jsx";
import ContactForm from "./ContactForm.jsx";

function App() {
    const [contacts, setContacts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentContact, setCurrenContact] = useState({})

    useEffect(() => {
        fetchContacts()
    }, [])
    const fetchContacts = async () => {
        const response = await fetch("http://127.0.0.1:5000/contacts")
        const data = await response.json()

        setContacts(data.contacts)
        console.log(data.contacts)
    }

    const closeModel = () => {
        setIsModalOpen(false)
        setCurrenContact({})
    }

    const openCreateModal = () => {

        if (!isModalOpen) setIsModalOpen(true)

    }
    const openEditModal = (contact) => {
        if (isModalOpen) return
        setCurrenContact(contact)
        setIsModalOpen(true)

    }

    const onUpdate = () => {
        closeModel()
        fetchContacts()
    }
    return <>
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
        <button onClick={openCreateModal}>Create New Contact</button>
        {
            isModalOpen && <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModel}>X</span>
                    <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
                </div>
            </div>

        }

    </>


}


export default App