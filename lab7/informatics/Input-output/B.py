a = int(input())
txt = 'The next number for the number {a} is {fplus}.'.format(a=a, fplus=a+1)
txt2 = 'The next number for the number {a} is {fminus}.'.format(a=a, fminus=a-1)
print(txt, txt2, sep='\n')