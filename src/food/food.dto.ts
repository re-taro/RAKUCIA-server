export type chooseFoodCategory =
  | 'chicken'
  | 'pork'
  | 'beef'
  | 'minced'
  | 'salmon'
  | 'pike'
  | 'mackerel'
  | 'yellowtail'
  | 'miso'
  | 'ton'
  | 'vegetable'
  | 'vermicelli';

export function throwIdFromCategory(category: chooseFoodCategory) {
  switch (category) {
    case 'chicken':
      return '10-277';
    case 'pork':
      return '10-276';
    case 'beef':
      return '10-275';
    case 'minced':
      return '10-278';
    case 'salmon':
      return '11-70';
    case 'pike':
      return '11-75';
    case 'mackerel':
      return '11-72';
    case 'yellowtail':
      return '11-74';
    case 'miso':
      return '17-159';
    case 'ton':
      return '17-161';
    case 'vegetable':
      return '17-169';
    case 'vermicelli':
      return '17-164-1369';
  }
}

export function throwNameFromCategory(category: string) {
  switch (category) {
    case 'meat':
      return '肉料理';
    case 'fish':
      return '魚料理';
    case 'soup':
      return 'スープ';
    case 'chicken':
      return '鶏肉料理';
    case 'pork':
      return '豚肉料理';
    case 'beef':
      return '牛肉料理';
    case 'minced':
      return '挽き肉料理';
    case 'salmon':
      return '鮭';
    case 'pike':
      return '秋刀魚';
    case 'mackerel':
      return '鯖';
    case 'yellowtail':
      return '鰤';
    case 'miso':
      return '味噌汁';
    case 'ton':
      return '豚汁';
    case 'vegetable':
      return '野菜スープ';
    case 'vermicelli':
      return '春雨スープ';
  }
}
