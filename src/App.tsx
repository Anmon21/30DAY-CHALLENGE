import { useState } from 'react'
import useLocalStorage from './hooks/uselocalstorage'
import type { Todo, FilterType } from './types/todo'

export default function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    setTodos([...todos, {
      id: crypto.randomUUID(),
      text: input.trim(),
      completed: false,
    }])
    setInput('')
  }

  const toggle = (id: string) =>
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))

  const remove = (id: string) =>
    setTodos(todos.filter(t => t.id !== id))

  // filter the list based on active tab
  const visible = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const remaining = todos.filter(t => !t.completed).length

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>My Todos</h1>

      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: '10px 14px', fontSize: 15, borderRadius: 8, border: '1px solid #ffffff' }}
        />
        <button type="submit" style={{ padding: '10px 18px', borderRadius: 8, background: '#1D9E75', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
          Add
        </button>
      </form>``

      {/* filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['all', 'active', 'completed'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '5px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
              border: '1px solid #ddd',
              background: filter === f ? '#1D9E75' : 'transparent',
              color: filter === f ? '#000000' : '#000000',
            }}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {visible.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid #000000' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggle(todo.id)}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <span style={{
              flex: 1, fontSize: 15,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#000000' : '#000000'
            }}>
              {todo.text}
            </span>
            <button onClick={() => remove(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: 18 }}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#999' }}>
          {remaining} item{remaining !== 1 ? 's' : ''} left
        </p>
      )}
    </div>
  )
}