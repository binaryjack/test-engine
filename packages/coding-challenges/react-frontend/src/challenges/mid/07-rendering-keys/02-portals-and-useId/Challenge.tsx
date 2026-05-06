/**
 * CHALLENGE — Portals & useId
 *
 * PART 1 — Toast Notification with createPortal
 *   - Build a ToastContainer that renders outside the React root via createPortal
 *   - The toast should appear at the bottom-right of the viewport (fixed position)
 *   - Even though the portal DOM node is outside #root, events and context work normally
 *   - Steps:
 *     1. Create a `portal-root` div and append it to document.body in useEffect
 *     2. Use createPortal to render the toast into that div
 *     3. The toast auto-dismisses after 3 seconds (useEffect + setTimeout)
 *
 * PART 2 — Accessible Form with useId
 *   - Build a reusable TextInput component
 *   - Each input must have a <label> linked via htmlFor / id
 *   - Use useId() to generate unique, SSR-stable IDs — do NOT use Math.random()
 *   - Add a second TextInput on the same page and verify both have unique IDs
 *
 * Key concepts tested:
 * - createPortal: escaping DOM hierarchy while staying in React tree
 * - Why portals are needed (z-index / overflow: hidden constraints)
 * - useId: stable unique IDs for accessibility
 * - useId vs list keys (useId is NOT for keys)
 */

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// ─── PART 1: Toast Portal ─────────────────────────────────────────────────────

interface ToastProps {
  message: string;
  onDismiss: () => void;
}
function Toast({ message, onDismiss }: ToastProps) {
    
  const [portal, setPortal] = useState<HTMLDivElement | null>()
  // const element = document.getElementById('portal-root') as HTMLDivElement
  
  useEffect(() => {   
        console.log('on message')   
    const t = setTimeout(() => {    
      console.log('closed')
      onDismiss?.()
    }, 3000)    
const el = document.getElementById('portal-root') as HTMLDivElement
  if(el) setPortal(el)    
    return() => clearTimeout(t); // Proper cleanup
  }, [ onDismiss])
  
  return portal ? createPortal(
    <div>{message}</div>, portal)  : null
}

function ToastDemo() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const nextId = useRef(0);

  function addToast(msg: string) {
    const id = nextId.current++;
    setToasts(prev => [...prev, { id, message: msg }]);
  }

  function removeToast(id: number) {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  return (
    <section>
      <h2>Part 1 — Toast Portal</h2>
      <button onClick={() => addToast(`Toast at ${new Date().toLocaleTimeString()}`)}>
        Show Toast
      </button>
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} onDismiss={() => removeToast(t.id)} />
      ))}
    </section>
  );
}

// ─── PART 2: Accessible TextInput with useId ─────────────────────────────────

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

// TODO 2: Implement TextInput

function TextInput({ label, value, onChange, hint }: TextInputProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id}>{label}</label>    
      <input
        id={id} 
        aria-describedby={hint ? hintId : undefined}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ display: 'block', marginTop: 4 }}
      />
      {hint && (
        <span id={hintId} style={{ fontSize: 12, color: '#888' }}>{hint}</span>
      )}
    </div>
  );
}

function AccessibleFormDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (   
    <section style={{ display: 'flex', position: 'relative', flexDirection: 'column'}}>
      <h2>Part 2 — Accessible Form with useId</h2>
      <p>Inspect the DOM — each label should be linked to its input via matching id/htmlFor.</p>
      <form onSubmit={e => e.preventDefault()}>
        <TextInput
          label="Full Name"
          value={name}
          onChange={setName}
          hint="As it appears on your ID"
        />
        <TextInput
          label="Email Address"
          value={email}
          onChange={setEmail}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

const childPortalStyle = { display: 'flex', alignItems: 'end', justifyItems: 'end', position:
    'fixed', right:'10px', bottom: '10px', zIndex: 99, flex: '1' }
const portalId = 'portal-root'
export default function App() {
  
  useEffect(() => {
    const ele = document.getElementById('portalId')
    if(ele) return
    const portalElement = document.createElement('div')
    portalElement.id = portalId
    portalElement.style.display = 'flex'
    portalElement.style.bottom = '10px'
    portalElement.style.right = '10px'
    portalElement.style.zIndex = '99'
    portalElement.style.alignItems = 'end'
    portalElement.style.justifyItems = 'end'
    portalElement.style.position = 'fixed'
    document.body.appendChild(portalElement)
    return () => {
      document.body.removeChild(portalElement)
    }  
  }, [])
  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif', maxWidth: 600, position: 'relative' }}>
      <h1>Portals & useId</h1>
      <ToastDemo />
      <hr />
      <AccessibleFormDemo />
    </div>
  );
}