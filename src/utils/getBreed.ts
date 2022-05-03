export default function getBreed(link:string){
    const result = link.slice(30).split('/')
    return result[0]
}