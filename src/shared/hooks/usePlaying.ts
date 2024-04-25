import { useEffect, useState } from "react"
import { useAppSelector } from "shared/hooks/useAppSelector"

interface UsePlayingI {
  isLoading: boolean
  isPlaying: boolean
  currentDuration: number
  onSetDuration: (value: number) => void
  onPause: () => void
  onPlay: () => void
}

export const usePlaying = (link: string, maxDuration: number, filename: string): UsePlayingI => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentDuration, setCurrentDuration] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [id, setId] = useState<NodeJS.Timeout | null>(null)

  const currentAudio = useAppSelector((state) => state.audio)

  useEffect(() => {
    if (currentAudio !== filename) {
      setIsPlaying(false)
      setCurrentDuration(0)
      clearInterval(id!)
    }
  }, [currentAudio, filename, id])

  const loadAudio = () => {
    const existingContainer = document.getElementById("audioContainer")
    if (existingContainer) {
      existingContainer.remove()
    }

    const audioElement = new Audio(link)
    audioElement.addEventListener("loadedmetadata", () => {
      setCurrentDuration(0)
    })
    audioElement.addEventListener("canplaythrough", () => {
      setIsLoading(false)
      setIsPlaying(true)
      audioElement.play()
      const newId = setInterval(() => {
        setCurrentDuration((prevState) => prevState + 1)
      }, 1000)
      setId(newId)

      const audioContainer = document.createElement("div")
      audioContainer.id = "audioContainer"
      audioContainer.appendChild(audioElement)
      document.body.appendChild(audioContainer)
    })
    setIsLoading(true)
    setAudio(audioElement)
  }

  const onPlay = () => {
    if (!audio) {
      loadAudio()
    } else {
      setCurrentDuration(0)
      audio.currentTime = 0
      audio.pause()

      audio.play()
      setIsPlaying(true)
      const newId = setInterval(() => {
        setCurrentDuration((prevState) => prevState + 1)
      }, 1000)
      setId(newId)
    }
  }

  const onPause = () => {
    if (!isLoading && isPlaying && audio) {
      audio.pause()
      setIsPlaying(false)
      if (id) clearInterval(id)
    }
  }

  const onSetDuration = (value: number) => {
    if (!audio) {
      onPlay()
    } else if (audio && !isLoading) {
      setCurrentDuration(value)

      const existingContainer = document.getElementById("audioContainer")
      if (existingContainer) {
        existingContainer.remove()
      }

      const newAudioElement = new Audio(link)
      newAudioElement.addEventListener("loadedmetadata", () => {
        newAudioElement.currentTime = value
        setCurrentDuration(value)
        setIsLoading(false)
        setIsPlaying(true)
        newAudioElement.play()
        const newId = setInterval(() => {
          setCurrentDuration((prevState) => prevState + 1)
        }, 1000)
        setId(newId)

        const audioContainer = document.createElement("div")
        audioContainer.id = "audioContainer"
        audioContainer.appendChild(newAudioElement)
        document.body.appendChild(audioContainer)
      })
      setIsLoading(true)
      setAudio(newAudioElement)
    }
  }

  useEffect(() => {
    if (currentDuration === maxDuration && audio) {
      audio.pause()
      setIsPlaying(false)
      setCurrentDuration(0)
      clearInterval(id!)
    }
  }, [currentDuration, id, maxDuration, audio])

  useEffect(() => {
    if (!isPlaying) {
      audio?.pause()
    }
    return () => {
      if (id) clearInterval(id)
    }
  }, [id, audio, isPlaying])

  return {
    isLoading,
    isPlaying,
    currentDuration,
    onSetDuration,
    onPause,
    onPlay,
  }
}
