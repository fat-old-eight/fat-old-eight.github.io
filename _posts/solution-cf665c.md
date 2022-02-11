---
layout: post
title: CF665C Simple Strings 题解
subtitle: 
categories: 题解
tags: CF 字符串 贪心
---


[题目描述](https://www.luogu.com.cn/problem/CF665C)
## 分析
根据题意，我们只需要当$t_i=t_{i+1}$或$t_i=t_{i-1}$时改变$t_i$的值，

因为只用**输出任意答案**，所以只需要备选三个字母进行修改即可。
## 代码
~~~ cpp
#include<bits/stdc++.h>
using namespace std;
char a[1000005];
int n;
int main()
{
	scanf("%s",a+1);
	n=strlen(a+1);
	for(int i=2;i<=n;i++)//注意要从2枚举到n
	{
		if(a[i]==a[i-1])
		{
			if('a'!=a[i-1]&&'a'!=a[i+1])a[i]='a';
			else if('b'!=a[i-1]&&'b'!=a[i+1])a[i]='b';
			else a[i]='c';//我在这里选的是a、b、c
		}
	}
	printf("%s",a+1);
   	return 0;
}
~~~
