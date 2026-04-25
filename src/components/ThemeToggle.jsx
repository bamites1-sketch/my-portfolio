import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <div className="relative inline-flex group" title="Switch Theme (T)">
      <button
        onClick={toggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          width: '52px',
          height: '28px',
          borderRadius: '100px',
          border: 'none',
          cursor: 'pointer',
          padding: '3px',
          position: 'relative',
          flexShrink: 0,
          background: isDark
            ? 'linear-gradient(135deg, #06b6d4, #10b981)'
            : 'linear-gradient(135deg, #f59e0b, #f97316)',
          boxShadow: isDark
            ? '0 0 16px rgba(6,182,212,0.5)'
            : '0 0 14px rgba(245,158,11,0.4)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Sun icon — visible in light mode */}
        <span style={{
          position: 'absolute', left: '6px', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '11px', lineHeight: 1,
          opacity: isDark ? 0 : 1,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
        }}>☀️</span>

        {/* Moon icon — visible in dark mode */}
        <span style={{
          position: 'absolute', right: '6px', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '11px', lineHeight: 1,
          opacity: isDark ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
        }}>🌙</span>

        {/* Sliding thumb */}
        <div style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: '3px',
          left: isDark ? 'calc(100% - 25px)' : '3px',
          transition: 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
        }}>
          <span style={{
            display: 'inline-block',
            transition: 'transform 0.4s ease',
            transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
          }}>
            {isDark ? '🌙' : '☀️'}
          </span>
        </div>
      </button>

      {/* Tooltip */}
      <div
        className="
          absolute -bottom-8 left-1/2 -translate-x-1/2
          px-2 py-1 rounded-md text-[11px] font-medium whitespace-nowrap
          pointer-events-none select-none
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          bg-slate-100 dark:bg-slate-800
          text-slate-500 dark:text-slate-400
          border border-slate-200 dark:border-slate-700
          shadow-sm
        "
      >
        Press T
      </div>
    </div>
  )
}
