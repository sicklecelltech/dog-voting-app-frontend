export default function getBreed(link:string):string{
    const result = link.slice(30).split('/')
    return result[0]
}