import { useMemo, useState } from 'react'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search, Send, MessageSquare, MoreVertical, Clock, Star } from 'lucide-react'
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
      { from: 'bot', text: 'Can you share the stacktrace?', time: '10:04' },
        { from: 'bot', text: 'Hi! How can I help you today?', time: '10:02' },
      { from: 'user', text: 'Getting a 500 on POST /tickets.', time: '10:03' },
      { from: 'bot', text: 'Can you share the stacktrace?', time: '10:04' },
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
  const [activeThreadId, setActiveThreadId] = useState(chatThreads[0].id)

  const filteredThreads = useMemo(() => {
    if (!query.trim()) return chatThreads
    return chatThreads.filter((thread) =>
      thread.name.toLowerCase().includes(query.toLowerCase()) || thread.subtitle.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  const activeThread = chatThreads.find((thread) => thread.id === activeThreadId) || chatThreads[0]

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
          <ThemeToggle />
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
                {/* <button className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200"> */}
                  
                  {/* <MoreVertical className="h-4 w-4" />
                </button> */}
                
                <button className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200">
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
                        onClick={() => setActiveThreadId(thread.id)}
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
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{activeThread.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    Online • Typing...
                  </p>
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <Input placeholder="Search in conversation..." className="rounded-full border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
                    <Button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" /> 
                    </Button>

                  {/* <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800">Active</span>
                  <span className="inline-flex items-center gap-1 text-xs">
                    <Clock className="h-4 w-4" /> Last reply {activeThread.time}
                  </span> */}
                </div>
              </div>
            </div>

            <div className="relative px-6 py-6">
              <div className="h-[560px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <ScrollArea className="flex h-[calc(100vh-200px)] rounded-[2rem] px-1 pb-4">
                  <div className="space-y-6">
                    {activeThread.messages.map((message, index) => (
                      <div
                        key={`${activeThread.id}-${index}`}
                        className={message.from === 'user' ? 'flex justify-end' : 'flex items-start gap-3'}
                      >
                        {message.from !== 'user' && (
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">AB</div>
                        )}
                        <div className={`max-w-xl rounded-[2rem] px-4 py-3 text-sm shadow-sm ${message.from === 'user' ? 'rounded-tl-none bg-slate-900 text-white dark:bg-slate-800' : 'rounded-tr-none bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100'}`}>
                          <p>{message.text}</p>
                        </div>
                        <p className={`mt-2 text-xs ${message.from === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>{message.time}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <Input placeholder="Write a message..." className="flex-1 rounded-full border-slate-200 bg-slate-100 px-5 py-3 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
                <Button className="w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 md:w-auto" size="lg">
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Chat