
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { getMockCartItems } from '@/lib/mockData';

// Delivery options
const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', price: 0, days: '3-5' },
  { id: 'express', name: 'Express Delivery', price: 10, days: '1-2' },
];

// Payment methods
const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'upi', name: 'UPI', icon: () => <span className="text-lg font-semibold">UPI</span> },
  { id: 'wallet', name: 'Digital Wallet', icon: () => <span className="text-lg font-semibold">W</span> },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [applyLoyaltyPoints, setApplyLoyaltyPoints] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form fields
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate address fields
    if (!formFields.firstName || !formFields.lastName || !formFields.address || !formFields.city || !formFields.zipCode || !formFields.phone) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setStep(2);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for card payment
    if (paymentMethod === 'card') {
      if (!formFields.cardNumber || !formFields.cardName || !formFields.expiry || !formFields.cvv) {
        toast({
          title: "Please fill all payment details",
          variant: "destructive",
        });
        return;
      }
    }
    
    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      setLoading(false);
      navigate('/order-confirmation');
    }, 1500);
  };
  
  // Calculate order summary from cart items
  const cartItems = getMockCartItems();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const deliveryOption = deliveryOptions.find(opt => opt.id === deliveryMethod) || deliveryOptions[0];
  const deliveryCost = deliveryOption.price;
  
  const loyaltyDiscount = applyLoyaltyPoints ? 10 : 0;
  const total = subtotal + deliveryCost - loyaltyDiscount;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="inline-flex items-center text-shop-primary hover:underline p-0"
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
          >
            <ChevronLeft size={16} />
            <span>{step > 1 ? 'Back to Shipping Address' : 'Back to Cart'}</span>
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Changes based on step */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                
                <form onSubmit={handleSubmitAddress}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formFields.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formFields.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formFields.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formFields.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select defaultValue="CA" onValueChange={(value) => setFormFields(prev => ({ ...prev, state: value }))}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formFields.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formFields.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formFields.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Delivery Options</h3>
                    <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-3">
                      {deliveryOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="flex-1 cursor-pointer flex justify-between">
                            <div>
                              <span className="font-medium">{option.name}</span>
                              <p className="text-sm text-shop-text-light">Estimated delivery: {option.days} business days</p>
                            </div>
                            <span>
                              {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div className="border-t border-gray-200 mt-8 pt-6">
                    <Button type="submit" className="btn-primary w-full md:w-auto float-right">
                      Continue to Payment
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                
                <form onSubmit={handleSubmitPayment}>
                  <div className="mb-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <div key={method.id} className="flex items-center space-x-2 border rounded-md p-3">
                            <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                            <Label htmlFor={`payment-${method.id}`} className="flex-1 cursor-pointer">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                                  <Icon size={20} />
                                </div>
                                <span className="font-medium">{method.name}</span>
                              </div>
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                  
                  {/* Card Payment Details - only show if card selected */}
                  {paymentMethod === 'card' && (
                    <div className="border rounded-md p-4 mb-6">
                      <div className="mb-4">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formFields.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="mb-4">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Smith"
                          value={formFields.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formFields.expiry}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formFields.cvv}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* UPI or Wallet would have their own forms here */}
                  
                  {/* Loyalty Points Option */}
                  <div className="border rounded-md p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="loyalty" 
                        checked={applyLoyaltyPoints}
                        onCheckedChange={(checked) => setApplyLoyaltyPoints(checked === true)}
                      />
                      <label
                        htmlFor="loyalty"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Apply Loyalty Points
                      </label>
                    </div>
                    <p className="text-sm text-shop-text-light mt-2 ml-6">
                      You have 1000 points available (worth $10)
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 mt-8 pt-6">
                    <Button 
                      type="submit" 
                      className="btn-primary w-full md:w-auto float-right"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          Place Order
                          <ChevronRight size={16} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start py-3 border-b">
                    <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-shop-text-light">Size: {item.size}</div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">Qty: {item.quantity}</span>
                        <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-b border-gray-200 py-3">
                <div className="flex justify-between mb-2">
                  <span className="text-shop-text-light">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-shop-text-light">Delivery</span>
                  <span>{deliveryCost === 0 ? 'Free' : `$${deliveryCost.toFixed(2)}`}</span>
                </div>
                {applyLoyaltyPoints && (
                  <div className="flex justify-between text-green-600">
                    <span>Loyalty Discount</span>
                    <span>-$10.00</span>
                  </div>
                )}
              </div>
              
              <div className="py-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Steps indicator */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-shop-primary text-white' : 'bg-gray-200'
                  }`}>
                    {step > 1 ? <Check size={16} /> : '1'}
                  </div>
                  <div className={`flex-1 h-1 ${step >= 2 ? 'bg-shop-primary' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-shop-primary text-white' : 'bg-gray-200'
                  }`}>
                    2
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="font-medium">Shipping</span>
                  <span className="font-medium">Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
