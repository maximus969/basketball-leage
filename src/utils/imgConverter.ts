export const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

export const imageConverter = (
    file: File,
    setNewImageUrl: React.Dispatch<React.SetStateAction<string>>
) => {
    getBase64(file)
        .then((res) => {
            if (typeof res === 'string') setNewImageUrl(res)
        })
        .catch((error) => {
            console.log(error)
        })
}
