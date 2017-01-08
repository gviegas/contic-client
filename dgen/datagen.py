#! /usr/bin/env python

import random

with open('data.json', 'w') as f:
  entry = '{{date: "{0} 20{1}",consumption: {2}}},\n'
  m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']  
  k = 1  
  f.write('[\n')
  for i in range(8, 17):
    for j in range(0, 12):
      while k % 29 != 0:
        f.write(entry.format(str(k) + ' ' + m[j], '0' + str(i) if i < 10 else str(i), random.randint(10, 30)))
        k += 1
      k = 1
  f.write(']')
