export default function getBreed(link:string){
    let result = link.slice(30).split('/')
    return result[0]
}