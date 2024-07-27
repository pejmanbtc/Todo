import React, { useState, useEffect } from 'react';
import './ActivityComponent.css';

const ActivityComponent = ({ title, type }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');
  const [score, setScore] = useState('');
  const [duration, setDuration] = useState('');
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Load data from Local Storage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem(`${type}Data`);
    if (savedData) {
      try {
        setEntries(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing saved data', error);
      }
    }
  }, [type]);

  // Save data to Local Storage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem(`${type}Data`, JSON.stringify(entries));
    }
  }, [entries, type]);

  const calculateDuration = () => {
    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(':');
      const [endHour, endMinute] = endTime.split(':');

      const start = new Date();
      start.setHours(parseInt(startHour, 10));
      start.setMinutes(parseInt(startMinute, 10));

      const end = new Date();
      end.setHours(parseInt(endHour, 10));
      end.setMinutes(parseInt(endMinute, 10));

      let diff = (end - start) / 1000 / 60 / 60;

      if (diff < 0) {
        diff += 24; // برای مواقعی که زمان پایان پس از نیمه شب باشد
      }

      const calculatedDuration = diff.toFixed(2);
      setDuration(calculatedDuration);
    }
  };

  const saveEntry = () => {
    const currentDate = new Date().toLocaleDateString();
    const newEntry = { startTime, endTime, note, score, duration, date: currentDate };
    setEntries([newEntry, ...entries]);
    setStartTime('');
    setEndTime('');
    setNote('');
    setScore('');
    setDuration('');
  };

  const handleDeleteEntry = (index) => {
    const confirmed = window.confirm('آیا مطمئنید که می‌خواهید این ورودی را حذف کنید؟');
    if (confirmed) {
      const updatedEntries = entries.filter((_, i) => i !== index);
      setEntries(updatedEntries);
    }
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  return (
    <div className='activity-component'>
      <h2>{title}</h2>
      <div>
        <h3>محاسبه زمان</h3>
        <label>
          ساعت شروع:
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>
        <label>
          ساعت پایان:
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>
        <button onClick={calculateDuration}>محاسبه</button>
        {duration && <p>مدت زمان فعالیت: {duration} ساعت</p>}
      </div>
      <div>
        <h3>یادداشت‌ها</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="نکات فعالیت را یادداشت کنید"
        />
      </div>
      <div>
        <h3>امتیاز</h3>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          max="10"
          min="0"
          placeholder="از 10 نمره دهید"
        />
      </div>
      <div>
        <h3>ذخیره اطلاعات</h3>
        <button onClick={saveEntry}>ذخیره</button>
        <div>
          {entries.map((entry, index) => (
            <div key={index} className="entry-box">
              <p>تاریخ: {entry.date}</p>
              <p>ساعت شروع: {entry.startTime}</p>
              <p>ساعت پایان: {entry.endTime}</p>
              <p>مدت زمان: {entry.duration} ساعت</p>
              <p>یادداشت: {entry.note}</p>
              <p>امتیاز: {entry.score}</p>
              <button onClick={() => handleDeleteEntry(index)} className="delete-button">×</button>
            </div>
          ))}
        </div>
      </div>
      {selectedEntry && (
        <div className="entry-detail">
          <h3>جزئیات فعالیت</h3>
          <p>ساعت شروع: {selectedEntry.startTime}</p>
          <p>ساعت پایان: {selectedEntry.endTime}</p>
          <p>مدت زمان: {selectedEntry.duration} ساعت</p>
          <p>یادداشت: {selectedEntry.note}</p>
          <p>امتیاز: {selectedEntry.score}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityComponent;





