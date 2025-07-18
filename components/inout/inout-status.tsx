"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Package, TruckIcon } from "lucide-react"

export default function InOutStatus() {
  const [statusFilters, setStatusFilters] = useState({
    type: "",
    productName: "",
    location: "",
    status: "",
    company: "",
    date: "",
  })
  const [showStatusFilters, setShowStatusFilters] = useState(false)

  // 입출고 현황 데이터 (예약/진행중)
  const statusData = [
    {
      id: 1,
      type: "inbound",
      productName: "태블릿 - iPad Pro",
      quantity: 20,
      location: "A구역-12",
      status: "예약",
      scheduledDate: "2024-01-16",
      scheduledTime: "10:00",
      company: "애플",
    },
    {
      id: 2,
      type: "outbound",
      productName: "헤드셋 - 게이밍",
      quantity: 15,
      location: "B구역-09",
      status: "진행중",
      scheduledDate: "2024-01-15",
      scheduledTime: "15:30",
      company: "레이저",
    },
    {
      id: 3,
      type: "inbound",
      productName: "프린터 - 레이저",
      quantity: 5,
      location: "C구역-06",
      status: "예약",
      scheduledDate: "2024-01-17",
      scheduledTime: "09:00",
      company: "HP",
    },
    {
      id: 4,
      type: "outbound",
      productName: "외장하드 - 2TB",
      quantity: 35,
      location: "A구역-15",
      status: "진행중",
      scheduledDate: "2024-01-15",
      scheduledTime: "16:00",
      company: "씨게이트",
    },
  ]

  const handleStatusFilterChange = (field: string, value: string) => {
    setStatusFilters((prev) => {
      const newFilters = {
        ...prev,
        [field]: value,
      }

      // 전체 버튼을 눌렀을 때 다른 필터들도 초기화
      if (field === "type" && value === "") {
        newFilters.status = ""
      }

      return newFilters
    })
  }

  // 필터링 로직
  const filteredStatus = statusData.filter((item) => {
    const typeMatch = statusFilters.type === "" || item.type === statusFilters.type
    const productNameMatch = item.productName.toLowerCase().includes(statusFilters.productName.toLowerCase())
    const locationMatch = item.location.toLowerCase().includes(statusFilters.location.toLowerCase())
    const statusMatch = statusFilters.status === "" || item.status === statusFilters.status
    const companyMatch = item.company.toLowerCase().includes(statusFilters.company.toLowerCase())

    let dateMatch = true
    if (statusFilters.date) {
      dateMatch = item.scheduledDate === statusFilters.date
    }

    return typeMatch && productNameMatch && locationMatch && statusMatch && companyMatch && dateMatch
  })

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">입출고 현황</h2>
      <div className="grid gap-6">
        {/* 필터 탭 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant={statusFilters.type === "" && statusFilters.status === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    handleStatusFilterChange("type", "")
                    handleStatusFilterChange("status", "")
                  }}
                >
                  전체
                </Button>
                <div className="h-4 w-px bg-gray-300"></div>
                <Button
                  variant={statusFilters.type === "inbound" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilterChange("type", "inbound")}
                >
                  입고
                </Button>
                <Button
                  variant={statusFilters.type === "outbound" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilterChange("type", "outbound")}
                >
                  출고
                </Button>
                <div className="h-4 w-px bg-gray-300"></div>
                <Button
                  variant={statusFilters.status === "예약" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilterChange("status", "예약")}
                >
                  예약
                </Button>
                <Button
                  variant={statusFilters.status === "진행중" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilterChange("status", "진행중")}
                >
                  진행중
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowStatusFilters(!showStatusFilters)}
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                검색
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* 검색 필터 */}
            {showStatusFilters && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
                <div>
                  <Label htmlFor="product-filter" className="text-sm font-medium">
                    상품명
                  </Label>
                  <Input
                    id="product-filter"
                    placeholder="상품명 검색..."
                    value={statusFilters.productName}
                    onChange={(e) => handleStatusFilterChange("productName", e.target.value)}
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="location-filter" className="text-sm font-medium">
                    위치
                  </Label>
                  <Input
                    id="location-filter"
                    placeholder="위치 검색..."
                    value={statusFilters.location}
                    onChange={(e) => handleStatusFilterChange("location", e.target.value)}
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="company-filter" className="text-sm font-medium">
                    거래처
                  </Label>
                  <Input
                    id="company-filter"
                    placeholder="거래처 검색..."
                    value={statusFilters.company}
                    onChange={(e) => handleStatusFilterChange("company", e.target.value)}
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="date-filter" className="text-sm font-medium">
                    날짜
                  </Label>
                  <Input
                    id="date-filter"
                    type="date"
                    value={statusFilters.date}
                    onChange={(e) => handleStatusFilterChange("date", e.target.value)}
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatusFilters({
                        type: "",
                        productName: "",
                        location: "",
                        status: "",
                        company: "",
                        date: "",
                      })
                    }}
                    className="mt-6 text-gray-600"
                  >
                    필터 초기화
                  </Button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">유형</th>
                    <th className="text-left p-3 font-semibold">상품명</th>
                    <th className="text-center p-3 font-semibold">수량</th>
                    <th className="text-center p-3 font-semibold">위치</th>
                    <th className="text-center p-3 font-semibold">상태</th>
                    <th className="text-left p-3 font-semibold">거래처</th>
                    <th className="text-center p-3 font-semibold">예정일시</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStatus.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {item.type === "inbound" ? (
                            <Package className="w-4 h-4 text-blue-500" />
                          ) : (
                            <TruckIcon className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === "inbound" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.type === "inbound" ? "입고" : "출고"}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="font-medium">{item.productName}</p>
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-semibold">{item.quantity.toLocaleString()}개</span>
                      </td>
                      <td className="p-3 text-center">{item.location}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "예약" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">{item.company}</td>
                      <td className="p-3 text-center">
                        <div>
                          <p className="text-sm">{item.scheduledDate}</p>
                          <p className="text-xs text-gray-500">{item.scheduledTime}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStatus.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>해당하는 현황이 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
