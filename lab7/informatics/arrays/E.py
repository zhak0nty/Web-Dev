n = int(input())
a = [0 if int(i) > 0 else 1 for i in input().split()]
flag = False
for i in range(n - 1):
    if(a[i] == a[i + 1]):
        print('YES')
        exit()
print('NO')