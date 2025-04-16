import { NextResponse } from "next/server";

const BASE_URL = "https://api.geoapify.com/v1/geocode/autocomplete"
export async function GET(request: any){
  const {searchParams} = new URL(request.url)
  const searchText = searchParams.get('text')
  const res = await fetch(BASE_URL+'?text='+searchText+'&apiKey='+process.env.AUTOCOMPLETE_API_KEY, {
    headers: {
      "Content-Type" : "application/json"
    }
  })
  const searchResult = await res.json()
  return NextResponse.json(searchResult)
}