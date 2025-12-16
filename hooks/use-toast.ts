import * as React from "react"

import type { ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 10000

type ToastsMap = Map<string, ToastProps>

type ActionType =
  | {
      type: "ADD_TOAST"
      toast: ToastProps
    }
  | {
      type: "UPDATE_TOAST"
      toast: Partial<ToastProps>
    }
  | {
      type: "DISMISS_TOAST"
      toastId?: string
    }
  | {
      type: "REMOVE_TOAST"
      toastId?: string
    }

interface State {
  toasts: ToastProps[]
}

const initialState: State = {
  toasts: [],
}

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST":
      const { toastId } = action
      // ! Side effects ! - This means all toasts will be dismissed/removed
      // only when the currently in-view toast has completed its exit
      // animation.
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      }

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

let memoryState: State = initialState
const listeners: ((state: State) => void)[] = []

function dispatch(action: ActionType) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

type Toast = Omit<ToastProps, "id"> & {
  id: string
}

function createToast(props: Omit<ToastProps, "id">) {
  const toast: ToastProps = { id: String(Date.now()), ...props }
  dispatch({ type: "ADD_TOAST", toast })
  return toast.id
}

function updateToast(id: string, props: Partial<ToastProps>) {
  dispatch({ type: "UPDATE_TOAST", toast: { id, ...props } })
}

function dismissToast(toastId?: string) {
  dispatch({ type: "DISMISS_TOAST", toastId })
}

function removeToast(toastId?: string) {
  dispatch({ type: "REMOVE_TOAST", toastId })
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    ...state,
    toast: React.useCallback((props: Omit<ToastProps, "id">) => {
      return createToast(props as Toast)
    }, []),
    dismiss: React.useCallback((toastId?: string) => {
      dismissToast(toastId)
    }, []),
    update: React.useCallback((id: string, props: Partial<ToastProps>) => {
      updateToast(id, props)
    }, []),
    remove: React.useCallback((toastId?: string) => {
      removeToast(toastId)
    }, []),
  }
}

export { createToast as toast }
