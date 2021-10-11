import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { connect } from "react-redux";
import * as actions from '../../redux/actions';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const formSubmitHandler = value => dispatch(actions.addContacts(value));

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    formSubmitHandler({ name, number });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.container} onSubmit={handleSubmit}>
      <label className={s.label} htmlFor="inputName">
        Name
      </label>
      <input
        className={s.input}
        placeholder="e.g. Elon Musk"
        type="text"
        id="inputName"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc."
        required
      />
      <label className={s.label} htmlFor="inputPhone">
        Phone number
      </label>
      <input
        className={s.input}
        placeholder="e.g. +1 310-363-6000 "
        id="inputPhone"
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   formSubmitHandler: (value) => dispatch(actions.addContacts(value)),
// });

// export default connect(null, mapDispatchToProps)(ContactForm);

ContactForm.propTypes = {
  formSubmitHandler: PropTypes.func,
};
