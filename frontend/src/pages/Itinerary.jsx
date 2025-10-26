import { useState } from 'react';
import api from '../services/api';

const ALLOWED_STATES = [
  "Delhi", "Uttar Pradesh", "Maharashtra", "Odisha",
  "Tamil Nadu", "Karnataka", "Rajasthan", "West Bengal"
];

const INTERESTS = [
  { label: "Festivals", value: "festivals" },
  { label: "Monuments", value: "monuments" },
  { label: "Food", value: "food" }
];

export default function Itinerary() {
  const [formData, setFormData] = useState({ location: '', interests: '' });
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ALLOWED_STATES.includes(formData.location)) {
      setError('Please select a valid state from dropdown.');
      return;
    }
    if (!INTERESTS.some(i => i.value === formData.interests)) {
      setError('Please select a valid interest from dropdown.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/api/itinerary/generate', formData);
      console.log("API response:", response.data);
      setItinerary(response.data);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        🗺️ Generate Travel Itinerary
      </h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <label htmlFor="location" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
          📍 Select State
        </label>
        <select
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem 1rem', width: '100%', marginBottom: '1rem' }}
        >
          <option value="">Choose a state</option>
          {ALLOWED_STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <label htmlFor="interests" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
          🎯 Interests
        </label>
        <select
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem 1rem', width: '100%', marginBottom: '1rem' }}
        >
          <option value="">Choose an interest</option>
          {INTERESTS.map(i => (
            <option key={i.value} value={i.value}>{i.label}</option>
          ))}
        </select>

        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#00796b',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Generating...' : '✨ Generate Itinerary'}
        </button>
      </form>

      {itinerary && (
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{itinerary.title}</h2>
          {itinerary.plan.activities.length === 0 ? (
              <p>No places found for the given interest.</p>
            ) : (
              itinerary.plan.activities.map((activity, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                  <h3>{activity.name}</h3>
                  {activity.image_url && <img src={activity.image_url} alt={activity.name} style={{ maxWidth: '100%', height: 'auto' }} />}
                  <p>{activity.description}</p>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}
