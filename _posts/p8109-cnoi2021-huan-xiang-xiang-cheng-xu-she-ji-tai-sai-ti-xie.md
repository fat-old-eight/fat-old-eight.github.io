---
layout: post
title: 题解 P8109 [Cnoi2021]幻想乡程序设计大赛 
subtitle: 
categories: 题解
tags: 贪心
---
[题意描述](https://www.luogu.com.cn/problem/P8109)

## 做法
显而易见的贪心

~~盲猜一手~~最优情况就是题目所给的单调不降

下面是**证明**

因为数组$a$和$b$均为单调不降序列且假设$a_i\le b_i$

所以对于任意$i$均有$a_i\leq a_{i+1}$和$b_i\leq b_{i+1}$

$ans_1=min(a_i,b_i)+min(a_{i+1},b_{i+1})$

交换$a_i$和$a_{i+1}$

$ans_2=min(a_{i+1},b_i)+min(a_i,b_{i+1})$

1.当$a_{i+1}\le b_i$时

有$a_{i}\le a_{i+1}\le b_{i} \le b_{i+1}$

所以$ans_1=a_i+a_{i+1}$ 

$ans_2=a_{i+1}+a_i$

所以$ans_1=ans_2$

2.当$a_{i+1}\ge b_{i}$时

有$a_{i}\le b_{i}\le a_{i+1}\le b_{i+1}$

所以$ans_1=a_i+a_{i+1}$

$ans_2=b_i+b_{i+1}$

所以$ans_1\ge ans_2$

3.当$a_{i+1}\ge b_{i+1}$时

有$a_{i}\le b_{i}\le b_{i+1} \le a_{i+1}$

所以$ans_1=a_i+b_{i+1}$

$ans_2=a_i+b_{i}$

所以$ans_1\ge ans_2$

综上交换$a_i$和$a_{i+1}$不能使$ans$增大

所以原序列最优

## 代码
~~~cpp
#include<bits/stdc++.h>
using namespace std;
int a[100005],s[100005],ans,n;
int main()
{
	scanf("%d",&n);
	for(int i=1;i<=n;i++)
	{
		scanf("%d",&a[i]);
	}
	for(int i=1;i<=n;i++)
	{
		scanf("%d",&s[i]);
	}
	for(int i=1;i<=n;i++)
	{
		ans+=min(a[i],s[i]);
	}
	printf("%d",ans);
}

~~~
