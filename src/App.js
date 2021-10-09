import PropTypes from 'prop-types';
import { useState } from 'react';
import useLocalStorage from './customHooks/useLocalStorage';
import Notiflix from 'notiflix';
import ContactForm from './components/contactForm/ContactForm';
import FilterByName from './components/filter/FilterByName';
import ContactList from './components/contactList/ContactList';
import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contactList', []);
  const [filter, setFilter] = useState('');

  // --------- Check if contact already in contactList and add Contact to list if not  ---------

  const handlerFormSubmit = data => {
    const findSpecificContact = contacts.find(
      contact => contact.name === data.name,
    );

    !findSpecificContact
      ? setContacts([data, ...contacts])
      : Notiflix.Notify.failure(
          `Sorry, but user with name ${data.name} has already registered in contacts. Please specify your name!`,
        );
  };

  // --------- Filtering contactList to find specific ---------

  const nameFinder = e => {
    setFilter(e.target.value);
  };

  // --------- Getting contactList for render ---------

  const getContacts = () => {
    const noramlizedDataInput = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(noramlizedDataInput),
    );
  };

  // --------- Deleting contact from contactList ---------

  const deleteContactFromList = data => {
    return setContacts(contacts.filter(contact => contact.id !== data.id));
  };

  // --------- render ---------

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm handlerFormSubmit={handlerFormSubmit} />

      <h2 className={s.title}>Contacts</h2>
      <FilterByName filter={filter} nameFinder={nameFinder} />
      <ContactList
        getContacts={getContacts()}
        deleteContactFromList={deleteContactFromList}
      />
    </div>
  );
}

// --------- propTypes options ---------

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: "",
//   };

//   // --------- Check if contact already in contactList and add Contact to list if not  ---------

//   handlerFormSubmit = (data) => {
//     const findSpecificContact = this.state.contacts.find(
//       (contact) => contact.name === data.name
//     );

//     !findSpecificContact
//       ? this.setState((prevState) => ({
//           contacts: [data, ...prevState.contacts],
//         }))
//       : Notiflix.Notify.failure(
//           `Sorry, but user with name ${data.name} has already registered in contacts. Please specify your name!`
//         );
//   };

//   // --------- Filtering contactList to find specific ---------

//   nameFinder = (e) => {
//     this.setState({
//       filter: e.target.value,
//     });
//   };

//   // --------- Getting contactList for render ---------

//   getContacts = () => {
//     const noramlizedDataInput = this.state.filter.toLowerCase();

//     return this.state.contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(noramlizedDataInput)
//     );
//   };

//   // --------- Deleting contact from contactList ---------

//   deleteContactFromList = (data) => {
//     return this.setState((prevState) => ({
//       contacts: prevState.contacts.filter((contact) => contact.id !== data.id),
//     }));
//   };

//   // --------- Add data to localStorage and get data from localStorage ---------

//   componentDidMount() {
//     const savedContactList = localStorage.getItem("contactList");
//     const parsedContactList = JSON.parse(savedContactList);

//     if (parsedContactList) {
//       this.setState({ contacts: parsedContactList });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem("contactList", JSON.stringify(this.state.contacts));
//     }
//   }

//   // --------- render ---------

//   render() {
//     return (
//       <div className={s.container}>
//         <h1 className={s.title}>Phonebook</h1>
//         <ContactForm handlerFormSubmit={this.handlerFormSubmit} />

//         <h2 className={s.title}>Contacts</h2>
//         <FilterByName filter={this.state.filter} nameFinder={this.nameFinder} />
//         <ContactList
//           getContacts={this.getContacts()}
//           deleteContactFromList={this.deleteContactFromList}
//         />
//       </div>
//     );
//   }
// }

// // --------- propTypes options ---------

// App.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
// };

// export default App;
