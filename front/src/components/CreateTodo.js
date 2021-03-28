import {useState} from "react";
import requester from "../utils/requester";
import Pathes from "../pathes";


export function CreateTodo({onAdd, userToken}) {
  const [inputValue, setInputValue] = useState('')
  const addNewTodo = async () => {
    await requester.put(Pathes.todo(userToken.token), {
      title: inputValue,
      token: userToken.token
    })
    setInputValue('')
    onAdd && onAdd()
  }

  return <>
    <input
      type="text"
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
    <button onClick={addNewTodo}>add</button>
  </>
}
