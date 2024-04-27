export const cleanup = () => {
  const audioContainer = document.getElementById("audioContainer")
  const audios = audioContainer?.querySelectorAll("audio")

  audios?.forEach((audio) => {
    audio.pause()
  })
}
