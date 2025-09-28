import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
}

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 89990,
    originalPrice: 99990,
    image: '/img/08a3468a-b37a-47d3-a160-5a204b7994de.jpg',
    colors: ['Space Gray', 'Silver', 'Gold', 'Deep Purple'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    inStock: true,
    warranty: '1 год официальной гарантии Apple',
    service: 'Бесплатный сервис в авторизованных центрах'
  },
  {
    id: 2,
    name: 'iPhone 14',
    brand: 'Apple',
    price: 69990,
    image: '/img/08a3468a-b37a-47d3-a160-5a204b7994de.jpg',
    colors: ['Midnight', 'Starlight', 'Blue', 'Purple', 'Red'],
    storage: ['128GB', '256GB', '512GB'],
    inStock: true,
    warranty: '1 год официальной гарантии Apple',
    service: 'Бесплатный сервис в авторизованных центрах'
  },
  {
    id: 3,
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 84990,
    originalPrice: 94990,
    image: '/img/8d10122a-9406-439e-a941-ebd68dd7529b.jpg',
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    storage: ['256GB', '512GB', '1TB'],
    inStock: true,
    warranty: '1 год официальной гарантии Samsung',
    service: 'Сервисное обслуживание в центрах Samsung'
  },
  {
    id: 4,
    name: 'Galaxy A54',
    brand: 'Samsung',
    price: 32990,
    image: '/img/8d10122a-9406-439e-a941-ebd68dd7529b.jpg',
    colors: ['Awesome Graphite', 'Awesome Violet', 'Awesome White', 'Awesome Lime'],
    storage: ['128GB', '256GB'],
    inStock: false,
    warranty: '1 год официальной гарантии Samsung',
    service: 'Сервисное обслуживание в центрах Samsung'
  }
]

function Index() {
  const [activeSection, setActiveSection] = useState('catalog')
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'Apple' | 'Samsung'>('all')
  const [cartItems, setCartItems] = useState<number[]>([])

  const filteredProducts = selectedBrand === 'all' 
    ? products 
    : products.filter(product => product.brand === selectedBrand)

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId])
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

            <div className="flex justify-center gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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