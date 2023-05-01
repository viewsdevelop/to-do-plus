import './App.css'

// Components
import List from './components/List'

const items = [
  {
    title: 'First Item',
    description: 'First Item to Complete',
    completed: false,
  },
  {
    title: 'Second Item',
    description: 'Second Item to Complete',
    completed: false,
  },
  {
    title: 'Third Item',
    description: 'Third Item to Complete',
    completed: false,
  },
]

function App() {
  return (
    <div>
      <List items={items} />
    </div>
  )
}

export default App
