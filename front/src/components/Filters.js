import {Filters} from "../constants";

export const Filter = ({filter, setFilter}) => {
  return <div onChange={e => setFilter(e.target.value)}>
    <div>
      <input type="radio"
             checked={filter === Filters.ALL}
             value={Filters.ALL}/> {Filters.ALL}
    </div>
    <div>
      <input type="radio"
             checked={filter === Filters.ACTIVE}
             value={Filters.ACTIVE}/> {Filters.ACTIVE}
    </div>
    <div>
      <input type="radio"
             checked={filter === Filters.COMPLETED}
             value={Filters.COMPLETED}/> {Filters.COMPLETED}
    </div>
  </div>
}