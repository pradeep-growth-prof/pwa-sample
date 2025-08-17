import { useRegisterSW } from 'virtual:pwa-register/react'

function PWABadge() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="PWABadge">
      {(offlineReady || needRefresh) && (
        <div className="PWABadge-toast">
          <div className="PWABadge-message">
            {offlineReady
              ? 'App ready to work offline'
              : 'New content available, click on reload button to update.'}
          </div>
          {needRefresh && (
            <button
              className="PWABadge-toast-button"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button className="PWABadge-toast-button" onClick={() => close()}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default PWABadge