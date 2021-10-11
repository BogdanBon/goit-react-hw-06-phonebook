import PropTypes from 'prop-types';
// import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import s from './FilterByName.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const getVisibleList = value => dispatch(actions.filterContacts(value));
  const filterList = e => {
    getVisibleList(e.target.value);
  };

  return (
    <div className={s.container}>
      <p className={s.label}>Find contacts by name</p>
      <input
        type="text"
        className={s.input}
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc."
        onChange={filterList}
      />
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   getVisibleList: (value) => dispatch(actions.filterContacts(value)),
// });

// export default connect(null, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: PropTypes.string,
  formSubmitHandler: PropTypes.func,
};
