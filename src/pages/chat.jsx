import { useEffect, useMemo, useRef, useState } from 'react'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search, Send, MessageSquare, MoreVertical, Star } from 'lucide-react'
import { ScrollArea } from '../components/ui/scroll-area'

const chatThreads = [
  {
    id: 'support-bot',
    name: 'Support Bot',
    subtitle: 'Sure, share the logs...',
    time: '10:02',
    unread: 1,
    messages: [
      { from: 'bot', text: 'Hi! How can I help you today?', time: '10:02' },
      { from: 'user', text: 'Getting a 500 on POST /tickets.', time: '10:03' },
      { from: 'bot', text: 'Can you share the stacktrace?', time: '10:04' }
    ]
  },
  {
    id: 'project-team',
    name: 'Project Team',
    subtitle: 'Standup at 10:30.',
    time: '09:50',
    unread: 0,
    messages: [
      { from: 'team', text: 'Standup starts in 10 minutes.', time: '09:50' },
      { from: 'user', text: 'I will join from the meeting room.', time: '09:51' }
    ]
  },
  {
    id: 'ananya',
    name: 'Ananya',
    subtitle: 'Lunch?',
    time: '09:12',
    unread: 0,
    messages: [
      { from: 'ananya', text: 'Lunch?', time: '09:12' },
      { from: 'user', text: 'Yes, meeting in the cafeteria.', time: '09:13' }
    ]
  }
]

function Chat() {
  const [query, setQuery] = useState('')
  const [threads, setThreads] = useState(chatThreads)
  const [activeThreadId, setActiveThreadId] = useState(chatThreads[0].id)
  const [drafts, setDrafts] = useState({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notification, setNotification] = useState('')

  const activeThread = threads.find((thread) => thread.id === activeThreadId) || null

  const filteredThreads = useMemo(() => {
    if (!query.trim()) return threads
    return threads.filter((thread) =>
      thread.name.toLowerCase().includes(query.toLowerCase()) || thread.subtitle.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, threads])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event) => {
      const target = event.target
      if (!target.closest?.('[data-chat-menu]')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const messageRef = useRef(null)
  const messagesEndRef = useRef(null)
  const currentDraft = activeThreadId ? drafts[activeThreadId] ?? '' : ''

  const resizeTextarea = (textarea) => {
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    resizeTextarea(messageRef.current)
  }, [activeThreadId, currentDraft])

  useEffect(() => {
    if (!messagesEndRef.current) return
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [activeThread?.messages.length, activeThreadId])

  const saveDraft = () => {
    if (!activeThreadId) return
    if (!currentDraft.trim()) {
      setNotification('No draft to save.')
      return
    }

    setDrafts((prev) => ({ ...prev, [activeThreadId]: currentDraft }))
    setNotification('Draft saved.')
    setIsMenuOpen(false)
  }

  const leaveChat = () => {
    if (activeThread) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.id === activeThreadId
            ? {
                ...thread,
                time,
                subtitle: 'You left the chat.',
                messages: [
                  ...thread.messages,
                  { from: 'system', text: 'You left the chat.', time }
                ]
              }
            : thread
        )
      )
    }

    setActiveThreadId(null)
    setIsMenuOpen(false)
    setNotification(activeThread ? `Left ${activeThread.name} chat.` : 'Left chat.')
  }

  const sendMessage = () => {
    if (!activeThread || !currentDraft.trim()) return

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === activeThreadId
          ? {
              ...thread,
              time,
              subtitle: currentDraft,
              messages: [...thread.messages, { from: 'user', text: currentDraft.trim(), time }]
            }
          : thread
      )
    )
    setDrafts((prev) => ({ ...prev, [activeThreadId]: '' }))
    setNotification('Message sent.')
  }

  const handleDraftChange = (event) => {
    if (!activeThreadId) return
    const value = event.target.value
    setDrafts((prev) => ({ ...prev, [activeThreadId]: value }))
    resizeTextarea(event.target)
  }

  return (
    <div className="top-0 left-0 right-0 min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">HelpDesk Chat</p>
              <p className="text-xs text-slate-400">Support conversation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Conversations</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Recent chats and tickets</p>
                </div>
                <button className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  className="pl-10"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search chats"
                />
              </div>

              <div className="mt-6 h-[520px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                <ScrollArea className="h-full rounded-[2rem] p-3">
                  <div className="space-y-3">
                    {filteredThreads.map((thread) => (
                      <button
                        key={thread.id}
                        type="button"
                        onClick={() => {
                          setActiveThreadId(thread.id)
                          setIsMenuOpen(false)
                          setNotification('')
                        }}
                        className={`w-full rounded-3xl p-4 text-left transition ${thread.id === activeThreadId ? 'bg-blue-50 dark:bg-blue-950/40' : 'hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                              <span className="text-sm font-semibold">{thread.name.charAt(0)}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{thread.name}</p>
                              <p className="truncate text-sm text-slate-500 dark:text-slate-400">{thread.subtitle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400">{thread.time}</p>
                            {thread.unread ? (
                              <span className="mt-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-semibold text-white">
                                {thread.unread}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Premium support</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Faster answers and priority escalation.</p>
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{activeThread ? activeThread.name : 'No conversation selected'}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    {activeThread ? 'Online • Typing...' : 'Please choose a conversation to continue.'}
                  </p>
                </div>
                <div className="relative flex items-center gap-3 text-slate-500 dark:text-slate-400">
                  <Input
                    placeholder="Search in conversation..."
                    className="rounded-full border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    disabled={!activeThread}
                  />
                  <div className="relative" data-chat-menu>
                    <Button
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setIsMenuOpen((open) => !open)}
                      disabled={!activeThread}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    {isMenuOpen && activeThread ? (
                      <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950">
                        <button
                          type="button"
                          onClick={saveDraft}
                          className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                        >
                          <span>Save draft</span>
                        </button>
                        <button
                          type="button"
                          onClick={leaveChat}
                          className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-destructive transition hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <span>Leave chat</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative px-6 py-6">
              <div className="h-[560px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                {activeThread ? (
                  <ScrollArea className="h-full min-h-0 rounded-[2rem] px-1 pb-4">
                    <div className="space-y-6">
                      {activeThread.messages.map((message, index) => (
                        <div
                          key={`${activeThread.id}-${index}`}
                          className={message.from === 'user' ? 'flex justify-end' : 'flex items-start gap-3'}
                        >
                          {message.from !== 'user' && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">AB</div>
                          )}
                          <div className={`max-w-xl break-words whitespace-pre-wrap rounded-[2rem] px-4 py-3 text-sm shadow-sm ${message.from === 'user' ? 'rounded-tl-none bg-slate-900 text-white dark:bg-slate-800' : 'rounded-tr-none bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100'}`}>
                            <p>{message.text}</p>
                          </div>
                          <p className={`mt-2 text-xs ${message.from === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>{message.time}</p>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex h-[560px] items-center justify-center rounded-[2rem] bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    Select a chat thread to view messages.
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <textarea
                  ref={messageRef}
                  placeholder={activeThread ? 'Write a message...' : 'Pick a chat to start typing.'}
                  className="flex-1 min-h-[3.25rem] max-h-44 w-full resize-none rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
                  value={currentDraft}
                  onChange={handleDraftChange}
                  disabled={!activeThread}
                  rows={1}
                />
                <Button
                  className="w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 md:w-auto"
                  size="lg"
                  type="button"
                  onClick={sendMessage}
                  disabled={!activeThread || !currentDraft.trim()}
                >
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </div>
              {notification ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{notification}</p>
              ) : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Chat