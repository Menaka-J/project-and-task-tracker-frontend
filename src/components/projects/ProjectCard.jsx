import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiCalendar, FiChevronRight, FiUserPlus } from 'react-icons/fi';

const ProjectCard = ({ project, isAdmin, onAddMember }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      transition: 'all 0.3s',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem', color: '#111827' }}>
            {project.name}
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {project.description || 'No description'}
          </p>
        </div>
        <div style={{ backgroundColor: '#dbeafe', borderRadius: '9999px', padding: '0.25rem 0.5rem', marginLeft: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#1d4ed8' }}>
            {project.totalTasks || 0} tasks
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>
          <FiUsers style={{ height: '1rem', width: '1rem' }} />
          <span>{project.members?.length || 1} members</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
          <FiCalendar style={{ height: '1rem', width: '1rem' }} />
          <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
        <button
          onClick={() => navigate(`/tasks?projectId=${project.id}`)}
          style={{
            flex: 1,
            backgroundColor: '#4f46e5',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          View Tasks
          <FiChevronRight style={{ height: '1rem', width: '1rem' }} />
        </button>
        
        {isAdmin && (
          <button
            onClick={onAddMember}
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: 'transparent',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FiUserPlus style={{ height: '1rem', width: '1rem' }} />
            Add Member
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;