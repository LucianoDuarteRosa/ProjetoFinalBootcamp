export function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="bg-card rounded-2xl rounded-bl-sm px-4 py-3 shadow-[2px_2px_10px_0px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-1">
          <span className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:0ms]" />
          <span className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:150ms]" />
          <span className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
