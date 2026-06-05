 const TaskCard = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div style={{
      ...styles.card,
      borderLeft: `4px solid ${task.status === 'completed' ? '#10b981' : '#f59e0b'}`
    }}>
      <div style={styles.top}>
        <h3 style={{
          ...styles.title,
          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
          color: task.status === 'completed' ? '#aaa' : '#111'
        }}>
          {task.title}
        </h3>
        <span style={{
          ...styles.badge,
          backgroundColor: task.status === 'completed' ? '#d1fae5' : '#fef3c7',
          color: task.status === 'completed' ? '#065f46' : '#92400e'
        }}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p style={styles.desc}>{task.description}</p>
      )}

      <div style={styles.actions}>
        <button onClick={() => onToggle(task._id)} style={styles.toggleBtn}>
          {task.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        <button onClick={() => onEdit(task)} style={styles.editBtn}>Edit</button>
        <button onClick={() => onDelete(task._id)} style={styles.deleteBtn}>Delete</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '18px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginBottom: '14px'
  },
  top: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  title: { fontSize: '16px', fontWeight: '600' },
  badge: { fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' },
  desc: { fontSize: '13px', color: '#666', marginBottom: '12px' },
  actions: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  toggleBtn: {
    padding: '6px 12px', backgroundColor: '#4f46e5', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
  },
  editBtn: {
    padding: '6px 12px', backgroundColor: '#f59e0b', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
  },
  deleteBtn: {
    padding: '6px 12px', backgroundColor: '#ef4444', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
  }
};

export default TaskCard;
