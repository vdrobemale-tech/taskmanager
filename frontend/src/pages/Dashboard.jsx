 import { useEffect, useState } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, form);
        setEditTask(null);
      } else {
        await API.post('/tasks', form);
      }
      setForm({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await API.patch(`/tasks/${id}/toggle`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setForm({ title: task.title, description: task.description });
  };

  const filteredTasks = tasks
    .filter(t => filter === 'all' ? true : t.status === filter)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Navbar />
      <div style={styles.container}>

        {/* Add / Edit Form */}
        <div style={styles.formBox}>
          <h3 style={styles.formTitle}>{editTask ? 'Edit Task' : 'Add New Task'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="text"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <textarea
              style={styles.textarea}
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={styles.btn}>
                {editTask ? 'Update Task' : 'Add Task'}
              </button>
              {editTask && (
                <button
                  type="button"
                  onClick={() => { setEditTask(null); setForm({ title: '', description: '' }); }}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Filter & Search */}
        <div style={styles.filterRow}>
          <input
            style={styles.search}
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={styles.filterBtns}>
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  ...styles.filterBtn,
                  backgroundColor: filter === f ? '#4f46e5' : '#e5e7eb',
                  color: filter === f ? 'white' : '#333'
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <p style={styles.empty}>No tasks found.</p>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '720px', margin: '30px auto', padding: '0 20px' },
  formBox: {
    backgroundColor: 'white', padding: '24px',
    borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '24px'
  },
  formTitle: { marginBottom: '16px', color: '#4f46e5' },
  input: {
    width: '100%', padding: '10px 14px', marginBottom: '12px',
    border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', display: 'block'
  },
  textarea: {
    width: '100%', padding: '10px 14px', marginBottom: '12px',
    border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px',
    resize: 'vertical', display: 'block'
  },
  btn: {
    padding: '10px 22px', backgroundColor: '#4f46e5', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
  },
  cancelBtn: {
    padding: '10px 22px', backgroundColor: '#e5e7eb', color: '#333',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
  },
  filterRow: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px', gap: '10px', flexWrap: 'wrap'
  },
  search: {
    padding: '9px 14px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '14px', flex: 1, minWidth: '180px'
  },
  filterBtns: { display: 'flex', gap: '8px' },
  filterBtn: {
    padding: '8px 16px', border: 'none',
    borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600'
  },
  empty: { textAlign: 'center', color: '#888', marginTop: '40px' }
};

export default Dashboard;
