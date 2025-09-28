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
  const [cartItems, setCartItems] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [user, setUser] = useState<User | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', phone: '', password: '' })

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

  const addToCart = (productId: number) => {
    if (!user) {
      alert('Войдите в аккаунт для добавления товаров в корзину')
      return
    }
    setCartItems(prev => [...prev, productId])
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

            <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
              <div className="flex gap-4">
                <Button
                  variant={selectedBrand === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedBrand('all')}
                  className="min-w-24"
                >
                  Все
                </Button>
                <Button
                  variant={selectedBrand === 'Apple' ? 'default' : 'outline'}
                  onClick={() => setSelectedBrand('Apple')}
                  className="min-w-24"
                >
                  Apple
                </Button>
                <Button
                  variant={selectedBrand === 'Samsung' ? 'default' : 'outline'}
                  onClick={() => setSelectedBrand('Samsung')}
                  className="min-w-24"
                >
                  Samsung
                </Button>
              </div>
              
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="popularity">Популярность</SelectItem>
                  <SelectItem value="new">Новинки</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                      onClick={() => addToCart(product.id)}
                    >
                      {product.inStock ? 'Купить' : 'Нет в наличии'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'cart':
        return (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Корзина</h2>
            <div className="flex items-center justify-center gap-2">
              <Icon name="ShoppingCart" size={24} />
              <p className="text-lg">В корзине {cartItems.length} товаров</p>
            </div>
            {user && <p className="text-muted-foreground">Пользователь: {user.name}</p>}
            <p className="text-muted-foreground">Функционал корзины в разработке</p>
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
                        {cartItems.length}
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