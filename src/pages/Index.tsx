import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'

interface Product {
  id: number
  name: string
  brand: 'Apple' | 'Samsung'
  price: number
  originalPrice?: number
  image: string
  colors: string[]
  storage: string[]
  inStock: boolean
  warranty: string
  service: string
  isNew?: boolean
  popularity: number
}

interface User {
  name: string
  email: string
  phone: string
}

interface CartItem {
  productId: number
  color: string
  storage: string
  quantity: number
}

interface OrderForm {
  email: string
  phone: string
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardHolder: string
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'popularity' | 'new'

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 119990,
    originalPrice: 129990,
    image: '/img/8f23330d-eb3b-458c-922c-caf175338f7d.jpg',
    colors: ['Titanium Natural', 'Titanium Blue', 'Titanium White', 'Titanium Black'],
    storage: ['256GB', '512GB', '1TB'],
    inStock: true,
    warranty: '1 год официальной гарантии Apple',
    service: 'Бесплатный сервис в авторизованных центрах',
    isNew: true,
    popularity: 95
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 89990,
    originalPrice: 99990,
    image: '/img/8f23330d-eb3b-458c-922c-caf175338f7d.jpg',
    colors: ['Titanium Natural', 'Titanium Blue', 'Titanium White', 'Titanium Black'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    inStock: true,
    warranty: '1 год официальной гарантии Apple',
    service: 'Бесплатный сервис в авторизованных центрах',
    isNew: true,
    popularity: 90
  },
  {
    id: 3,
    name: 'iPhone 15',
    brand: 'Apple',
    price: 79990,
    image: '/img/8f23330d-eb3b-458c-922c-caf175338f7d.jpg',
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    storage: ['128GB', '256GB', '512GB'],
    inStock: true,
    warranty: '1 год официальной гарантии Apple',
    service: 'Бесплатный сервис в авторизованных центрах',
    isNew: true,
    popularity: 88
  },
  {
    id: 4,
    name: 'iPhone 14',
    brand: 'Apple',
    price: 69990,
    originalPrice: 79990,
    image: '/img/3dc01dae-6984-4577-b116-4fe5d423f134.jpg',
    colors: ['Midnight', 'Starlight', 'Blue', 'Purple', 'Red'],
    storage: ['128GB', '256GB', '512GB'],
    inStock: true,
    warranty: '1 год официальной гарантии Apple',
    service: 'Бесплатный сервис в авторизованных центрах',
    popularity: 85
  },
  {
    id: 5,
    name: 'iPhone 13',
    brand: 'Apple',
    price: 59990,
    originalPrice: 69990,
    image: '/img/3dc01dae-6984-4577-b116-4fe5d423f134.jpg',
    colors: ['Pink', 'Blue', 'Midnight', 'Starlight', 'Red'],
    storage: ['128GB', '256GB', '512GB'],
    inStock: true,
    warranty: '1 год официальной гарантии Apple',
    service: 'Бесплатный сервис в авторизованных центрах',
    popularity: 80
  },
  {
    id: 6,
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 94990,
    originalPrice: 104990,
    image: '/img/5e33add0-5c05-4a4e-a521-28c57fc80b28.jpg',
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    storage: ['256GB', '512GB', '1TB'],
    inStock: true,
    warranty: '1 год официальной гарантии Samsung',
    service: 'Сервисное обслуживание в центрах Samsung',
    isNew: true,
    popularity: 92
  },
  {
    id: 7,
    name: 'Galaxy S24+',
    brand: 'Samsung',
    price: 74990,
    image: '/img/5e33add0-5c05-4a4e-a521-28c57fc80b28.jpg',
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    storage: ['256GB', '512GB'],
    inStock: true,
    warranty: '1 год официальной гарантии Samsung',
    service: 'Сервисное обслуживание в центрах Samsung',
    isNew: true,
    popularity: 87
  },
  {
    id: 8,
    name: 'Galaxy S24',
    brand: 'Samsung',
    price: 64990,
    image: '/img/5e33add0-5c05-4a4e-a521-28c57fc80b28.jpg',
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    storage: ['128GB', '256GB'],
    inStock: true,
    warranty: '1 год официальной гарантии Samsung',
    service: 'Сервисное обслуживание в центрах Samsung',
    isNew: true,
    popularity: 84
  },
  {
    id: 9,
    name: 'Galaxy A54',
    brand: 'Samsung',
    price: 32990,
    originalPrice: 39990,
    image: '/img/5e33add0-5c05-4a4e-a521-28c57fc80b28.jpg',
    colors: ['Awesome Graphite', 'Awesome Violet', 'Awesome White', 'Awesome Lime'],
    storage: ['128GB', '256GB'],
    inStock: true,
    warranty: '1 год официальной гарантии Samsung',
    service: 'Сервисное обслуживание в центрах Samsung',
    popularity: 75
  },
  {
    id: 10,
    name: 'Galaxy A34',
    brand: 'Samsung',
    price: 24990,
    image: '/img/5e33add0-5c05-4a4e-a521-28c57fc80b28.jpg',
    colors: ['Awesome Graphite', 'Awesome Silver', 'Awesome Violet', 'Awesome Lime'],
    storage: ['128GB', '256GB'],
    inStock: false,
    warranty: '1 год официальной гарантии Samsung',
    service: 'Сервисное обслуживание в центрах Samsung',
    popularity: 70
  }
]

function Index() {
  const [activeSection, setActiveSection] = useState('catalog')
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'Apple' | 'Samsung'>('all')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [user, setUser] = useState<User | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedStorage, setSelectedStorage] = useState('')
  const [orderForm, setOrderForm] = useState<OrderForm>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  })
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)

  const filteredAndSortedProducts = () => {
    const filtered = selectedBrand === 'all' 
      ? products 
      : products.filter(product => product.brand === selectedBrand)
    
    switch (sortBy) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price)
      case 'popularity':
        return filtered.sort((a, b) => b.popularity - a.popularity)
      case 'new':
        return filtered.filter(p => p.isNew).concat(filtered.filter(p => !p.isNew))
      default:
        return filtered
    }
  }

  const openProductDialog = (product: Product) => {
    if (!user) {
      alert('Войдите в аккаунт для добавления товаров в корзину')
      return
    }
    setSelectedProduct(product)
    setSelectedColor(product.colors[0])
    setSelectedStorage(product.storage[0])
  }

  const addToCart = () => {
    if (!selectedProduct || !selectedColor || !selectedStorage) return
    
    const existingItem = cartItems.find(
      item => 
        item.productId === selectedProduct.id && 
        item.color === selectedColor && 
        item.storage === selectedStorage
    )
    
    if (existingItem) {
      setCartItems(prev => 
        prev.map(item => 
          item.productId === selectedProduct.id && 
          item.color === selectedColor && 
          item.storage === selectedStorage
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCartItems(prev => [...prev, {
        productId: selectedProduct.id,
        color: selectedColor,
        storage: selectedStorage,
        quantity: 1
      }])
    }
    
    setSelectedProduct(null)
  }

  const removeFromCart = (productId: number, color: string, storage: string) => {
    setCartItems(prev => prev.filter(
      item => !(item.productId === productId && item.color === color && item.storage === storage)
    ))
  }

  const updateQuantity = (productId: number, color: string, storage: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, color, storage)
      return
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId && item.color === color && item.storage === storage
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '')
    }
    return v
  }

  const handleOrderFormChange = (field: keyof OrderForm, value: string) => {
    let formattedValue = value
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/gi, '').substring(0, 3)
    } else if (field === 'postalCode') {
      formattedValue = value.replace(/[^0-9]/gi, '').substring(0, 6)
    }
    
    setOrderForm(prev => ({ ...prev, [field]: formattedValue }))
  }

  const processOrder = async () => {
    setIsProcessingOrder(true)
    
    // Имитация обработки заказа
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Очищаем корзину и форму после успешного заказа
    setCartItems([])
    setOrderForm({
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: ''
    })
    
    setIsProcessingOrder(false)
    setActiveSection('catalog')
    
    alert('Заказ успешно оформлен! Спасибо за покупку!')
  }

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (authMode === 'register') {
      setUser({ name: authForm.name, email: authForm.email, phone: authForm.phone })
    } else {
      setUser({ name: 'Пользователь', email: authForm.email, phone: '' })
    }
    setAuthForm({ name: '', email: '', phone: '', password: '' })
  }

  const logout = () => {
    setUser(null)
    setCartItems([])
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'catalog':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-primary">PHONE STORE</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Премиальные смартфоны Apple и Samsung с официальной гарантией и сервисом
              </p>
            </div>

            <Card className="bg-gradient-to-r from-background/50 to-secondary/20 border-2">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <Icon name="Filter" size={18} className="text-primary" />
                      <h3 className="font-medium">Фильтры по брендам</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          selectedBrand === 'all' 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                            : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:shadow-md'
                        }`}
                        onClick={() => setSelectedBrand('all')}
                      >
                        <Icon name="Grid3X3" size={16} className="inline mr-2" />
                        Все бренды
                      </button>
                      <button
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          selectedBrand === 'Apple' 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                            : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:shadow-md'
                        }`}
                        onClick={() => setSelectedBrand('Apple')}
                      >
                        <Icon name="Apple" size={16} className="inline mr-2" />
                        Apple
                      </button>
                      <button
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          selectedBrand === 'Samsung' 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                            : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:shadow-md'
                        }`}
                        onClick={() => setSelectedBrand('Samsung')}
                      >
                        <Icon name="Smartphone" size={16} className="inline mr-2" />
                        Samsung
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3 min-w-fit">
                    <div className="flex items-center gap-2">
                      <Icon name="ArrowUpDown" size={18} className="text-primary" />
                      <h3 className="font-medium">Сортировка</h3>
                    </div>
                    <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                      <SelectTrigger className="w-64 h-12 shadow-md border-2 border-border/50 hover:border-primary/30 transition-all duration-200 rounded-xl bg-background">
                        <SelectValue placeholder="Сортировка" />
                      </SelectTrigger>
                      <SelectContent className="w-64 rounded-xl">
                        <SelectItem value="default" className="hover:bg-secondary/50 rounded-lg mx-1">
                          <div className="flex items-center gap-2">
                            <Icon name="RotateCcw" size={16} />
                            По умолчанию
                          </div>
                        </SelectItem>
                        <SelectItem value="price-asc" className="hover:bg-secondary/50 rounded-lg mx-1">
                          <div className="flex items-center gap-2">
                            <Icon name="TrendingUp" size={16} />
                            Цена: по возрастанию
                          </div>
                        </SelectItem>
                        <SelectItem value="price-desc" className="hover:bg-secondary/50 rounded-lg mx-1">
                          <div className="flex items-center gap-2">
                            <Icon name="TrendingDown" size={16} />
                            Цена: по убыванию
                          </div>
                        </SelectItem>
                        <SelectItem value="popularity" className="hover:bg-secondary/50 rounded-lg mx-1">
                          <div className="flex items-center gap-2">
                            <Icon name="Heart" size={16} />
                            Популярность
                          </div>
                        </SelectItem>
                        <SelectItem value="new" className="hover:bg-secondary/50 rounded-lg mx-1">
                          <div className="flex items-center gap-2">
                            <Icon name="Sparkles" size={16} />
                            Новинки
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Статистика */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-4 border-t border-border/30 gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 bg-secondary/50 px-3 py-1 rounded-full">
                      <Icon name="Package" size={16} />
                      <span>Найдено: {getFilteredProducts().length} товаров</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-primary">
                      <Icon name="ShoppingCart" size={16} />
                      <span>В корзине: {getCartItemsCount()}</span>
                    </div>
                    {getCartItemsCount() > 0 && (
                      <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-green-700 dark:text-green-300">
                        <Icon name="DollarSign" size={16} />
                        <span>{formatPrice(getCartTotal())}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts().map((product) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square bg-gray-50 p-8 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                        Скидка
                      </Badge>
                    )}
                    {product.isNew && (
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                        Новинка
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="secondary" className="absolute top-3 left-3">
                        Нет в наличии
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon 
                            key={i} 
                            name="Star" 
                            size={12} 
                            className={i < Math.floor(product.popularity / 20) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.popularity}% рейтинг)</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Цвета:</p>
                        <p className="text-xs text-muted-foreground">
                          {product.colors.slice(0, 2).join(', ')}
                          {product.colors.length > 2 && ` +${product.colors.length - 2}`}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Память:</p>
                        <p className="text-xs text-muted-foreground">
                          {product.storage.join(', ')}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon name="Shield" size={14} className="text-accent" />
                          <p className="text-xs text-muted-foreground">{product.warranty}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Wrench" size={14} className="text-accent" />
                          <p className="text-xs text-muted-foreground">{product.service}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!product.inStock}
                      onClick={() => openProductDialog(product)}
                    >
                      {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'cart':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Корзина</h2>
              {user && <p className="text-muted-foreground">Пользователь: {user.name}</p>}
            </div>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground mb-4">Добавьте товары из каталога</p>
                <Button onClick={() => setActiveSection('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  {cartItems.map((item, index) => {
                    const product = products.find(p => p.id === item.productId)
                    if (!product) return null
                    
                    return (
                      <Card key={`${item.productId}-${item.color}-${item.storage}-${index}`} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="w-24 h-24 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.brand}</p>
                              </div>
                              
                              <div className="flex gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Цвет: </span>
                                  <span className="text-muted-foreground">{item.color}</span>
                                </div>
                                <div>
                                  <span className="font-medium">Память: </span>
                                  <span className="text-muted-foreground">{item.storage}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.productId, item.color, item.storage, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.productId, item.color, item.storage, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                                
                                <div className="text-right">
                                  <p className="text-lg font-bold">{formatPrice(product.price * item.quantity)}</p>
                                  {item.quantity > 1 && (
                                    <p className="text-sm text-muted-foreground">
                                      {formatPrice(product.price)} за шт.
                                    </p>
                                  )}
                                </div>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.productId, item.color, item.storage)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-semibold">Итого товаров:</span>
                        <span>{getCartItemsCount()} шт.</span>
                      </div>
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>К оплате:</span>
                        <span>{formatPrice(getCartTotal())}</span>
                      </div>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => setActiveSection('checkout')}
                      >
                        <Icon name="CreditCard" size={20} className="mr-2" />
                        Оформить заказ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )

      case 'delivery':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">Доставка</h2>
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Truck" size={24} className="text-accent" />
                    <h3 className="font-semibold">Курьерская доставка</h3>
                  </div>
                  <p className="text-muted-foreground">По Москве и области - 500 ₽. Бесплатно при заказе от 50 000 ₽</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={24} className="text-accent" />
                    <h3 className="font-semibold">Самовывоз</h3>
                  </div>
                  <p className="text-muted-foreground">Из магазина бесплатно. Готов к выдаче в день заказа</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'contacts':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">Контакты</h2>
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={24} className="text-accent" />
                    <div>
                      <h3 className="font-semibold">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={24} className="text-accent" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">info@phonestore.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={24} className="text-accent" />
                    <div>
                      <h3 className="font-semibold">Адрес</h3>
                      <p className="text-muted-foreground">Москва, ул. Тверская, 1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">О нас</h2>
            <Card>
              <CardContent className="p-8 space-y-4">
                <p className="text-lg leading-relaxed">
                  PHONE STORE — официальный партнер Apple и Samsung в России. 
                  Мы предлагаем только оригинальные устройства с полной гарантией производителя.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Shield" size={24} className="text-accent" />
                      <h3 className="font-semibold">Гарантия качества</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Все товары оригинальные с официальной гарантией производителя
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Wrench" size={24} className="text-accent" />
                      <h3 className="font-semibold">Сервисное обслуживание</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Собственный сервисный центр и партнерская сеть по всей России
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'checkout':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Оформление заказа</h2>
              <p className="text-muted-foreground">Заполните данные для доставки и оплаты</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Форма заказа */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Имя</Label>
                        <Input
                          id="firstName"
                          value={orderForm.firstName}
                          onChange={(e) => handleOrderFormChange('firstName', e.target.value)}
                          placeholder="Введите имя"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Фамилия</Label>
                        <Input
                          id="lastName"
                          value={orderForm.lastName}
                          onChange={(e) => handleOrderFormChange('lastName', e.target.value)}
                          placeholder="Введите фамилию"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={orderForm.email}
                          onChange={(e) => handleOrderFormChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          value={orderForm.phone}
                          onChange={(e) => handleOrderFormChange('phone', e.target.value)}
                          placeholder="+7 (999) 123-45-67"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Адрес доставки</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Адрес</Label>
                        <Input
                          id="address"
                          value={orderForm.address}
                          onChange={(e) => handleOrderFormChange('address', e.target.value)}
                          placeholder="Улица, дом, квартира"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Город</Label>
                          <Input
                            id="city"
                            value={orderForm.city}
                            onChange={(e) => handleOrderFormChange('city', e.target.value)}
                            placeholder="Москва"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Почтовый индекс</Label>
                          <Input
                            id="postalCode"
                            value={orderForm.postalCode}
                            onChange={(e) => handleOrderFormChange('postalCode', e.target.value)}
                            placeholder="123456"
                            maxLength={6}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      <Icon name="CreditCard" size={20} className="inline mr-2" />
                      Данные карты
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardHolder">Имя держателя карты</Label>
                        <Input
                          id="cardHolder"
                          value={orderForm.cardHolder}
                          onChange={(e) => handleOrderFormChange('cardHolder', e.target.value)}
                          placeholder="IVAN PETROV"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Номер карты</Label>
                        <Input
                          id="cardNumber"
                          value={orderForm.cardNumber}
                          onChange={(e) => handleOrderFormChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Срок действия</Label>
                          <Input
                            id="expiryDate"
                            value={orderForm.expiryDate}
                            onChange={(e) => handleOrderFormChange('expiryDate', e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={orderForm.cvv}
                            onChange={(e) => handleOrderFormChange('cvv', e.target.value)}
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Сводка заказа */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Ваш заказ</h3>
                    <div className="space-y-4">
                      {cartItems.map((item, index) => {
                        const product = products.find(p => p.id === item.productId)
                        if (!product) return null
                        
                        return (
                          <div key={`${item.productId}-${item.color}-${item.storage}-${index}`} className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <div className="w-12 h-12 bg-gray-50 rounded p-1">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.color}, {item.storage}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Количество: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-sm">
                              {formatPrice(product.price * item.quantity)}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="border-t pt-4 mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Товары ({getCartItemsCount()} шт.)</span>
                        <span>{formatPrice(getCartTotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Доставка</span>
                        <span>Бесплатно</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Итого</span>
                        <span>{formatPrice(getCartTotal())}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveSection('cart')}
                    className="flex-1"
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Назад в корзину
                  </Button>
                  <Button
                    onClick={processOrder}
                    disabled={isProcessingOrder || !orderForm.firstName || !orderForm.lastName || !orderForm.email || !orderForm.phone || !orderForm.address || !orderForm.city || !orderForm.cardNumber || !orderForm.expiryDate || !orderForm.cvv || !orderForm.cardHolder}
                    className="flex-1"
                  >
                    {isProcessingOrder ? (
                      <>
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Обработка...
                      </>
                    ) : (
                      <>
                        <Icon name="Check" size={16} className="mr-2" />
                        Оплатить {formatPrice(getCartTotal())}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setActiveSection('catalog')}
                className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
              >
                PHONE STORE
              </button>
              
              <div className="hidden md:flex items-center gap-6">
                {[
                  { id: 'catalog', label: 'Каталог', icon: 'Grid3X3' },
                  { id: 'cart', label: 'Корзина', icon: 'ShoppingCart' },
                  { id: 'delivery', label: 'Доставка', icon: 'Truck' },
                  { id: 'about', label: 'О нас', icon: 'Info' },
                  { id: 'contacts', label: 'Контакты', icon: 'Phone' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon name={item.icon as any} size={16} />
                    {item.label}
                    {item.id === 'cart' && cartItems.length > 0 && (
                      <Badge variant="secondary" className="ml-1 bg-accent text-accent-foreground">
                        {getCartItemsCount()}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Привет, {user.name}!</span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Выйти
                  </Button>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Icon name="User" size={16} className="mr-2" />
                      Вход
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAuth} className="space-y-4">
                      {authMode === 'register' && (
                        <div>
                          <Label htmlFor="name">Имя</Label>
                          <Input
                            id="name"
                            value={authForm.name}
                            onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                            required
                          />
                        </div>
                      )}
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={authForm.email}
                          onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                          required
                        />
                      </div>
                      {authMode === 'register' && (
                        <div>
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            value={authForm.phone}
                            onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                            required
                          />
                        </div>
                      )}
                      <div>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                          id="password"
                          type="password"
                          value={authForm.password}
                          onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                      >
                        {authMode === 'login' ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Вход'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {renderSection()}
      </main>

      {/* Product Selection Dialog */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Выберите характеристики</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-50 rounded-lg p-4 mx-auto mb-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                <p className="text-muted-foreground">{selectedProduct.brand}</p>
                <p className="text-xl font-bold mt-2">{formatPrice(selectedProduct.price)}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Цвет</Label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProduct.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Объем памяти</Label>
                  <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProduct.storage.map((storage) => (
                        <SelectItem key={storage} value={storage}>
                          {storage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedProduct(null)} className="flex-1">
                  Отмена
                </Button>
                <Button onClick={addToCart} className="flex-1">
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <footer className="border-t bg-secondary/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 PHONE STORE. Все права защищены.</p>
            <p className="mt-2">Официальный партнер Apple и Samsung</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index