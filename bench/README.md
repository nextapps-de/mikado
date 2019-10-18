<h1>Benchmark of Template Rendering</h1>

Run the benchmark (non-keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/">https://raw.githack.com/nextapps-de/mikado/master/bench/</a><br>

Run the benchmark (keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#keyed">https://raw.githack.com/nextapps-de/mikado/master/bench/#keyed</a><br>

Run the benchmark (internal/data-driven):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#internal">https://raw.githack.com/nextapps-de/mikado/master/bench/#internal</a><br>

There are 3 kinds of test scenarios:

<table>
    <tr>
        <td>1.&nbsp;non-keyed</td>
        <td>In this mode all existing nodes could be reused (recycling nodes).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>2.&nbsp;keyed</td>
        <td>In this mode just existing nodes with the same key (ID) could be reused. Re-arrangement / reconcile is a rare implemented but strong feature which is explicitly covered by the test "order".</td>
    </tr>
    <tr></tr>
    <tr>
        <td>3.&nbsp;data-driven</td>
        <td>This mode runs through the same internal pool of data (same references, no new data from external or by creation) and compares the performance of data-driven paradigm. Especially the test "update" and "repaint" covers the strength of this mode.</td>
    </tr>
</table>

Weather a library provides optimizations to one of these modes or not, it is fair to compare each of them in a different scenario.

#### Keyed

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align=center><sub>KB</sub></td>
        <td align=center><sub>RAM</sub></td>
        <td align=center><sub>Create</sub></td>
        <td align=center><sub>Replace</sub></td>
        <td align=center><sub>Update</sub></td>
        <td align=center><sub>Order</sub></td>
        <td align=center><sub>Repaint</sub></td>
        <td align=center><sub>Append</sub></td>
        <td align=center><sub>Remove</sub></td>
        <td align=center><sub>Toggle</sub></td>
        <td align=center><sub>Clear</sub></td>
        <td align=center><sub>Index</sub></td>
        <td align=center><sub>Score</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align=right><sub>2.8</sub></td>
        <td align=right><sub>26</sub></td>
        <td align=right><sub>18049</sub></td>
        <td align=right><sub>7988</sub></td>
        <td align=right><sub>233959</sub></td>
        <td align=right><sub>28262</sub></td>
        <td align=right><sub>241864</sub></td>
        <td align=right><sub>32552</sub></td>
        <td align=right><sub>26697</sub></td>
        <td align=right><sub>29532</sub></td>
        <td align=right><sub>24919</sub></td>
        <td align=right><b><sub>996</sub></b></td>
        <td align=right><b><sub>69305</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>359</sub></td>
        <td align=right><sub>755</sub></td>
        <td align=right><sub>701</sub></td>
        <td align=right><sub>5701</sub></td>
        <td align=right><sub>3974</sub></td>
        <td align=right><sub>5760</sub></td>
        <td align=right><sub>1320</sub></td>
        <td align=right><sub>5538</sub></td>
        <td align=right><sub>2271</sub></td>
        <td align=right><sub>12608</sub></td>
        <td align=right><b><sub>180</sub></b></td>
        <td align=right><b><sub>2931</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>294</sub></td>
        <td align=right><sub>620</sub></td>
        <td align=right><sub>603</sub></td>
        <td align=right><sub>4674</sub></td>
        <td align=right><sub>3245</sub></td>
        <td align=right><sub>4774</sub></td>
        <td align=right><sub>1121</sub></td>
        <td align=right><sub>6501</sub></td>
        <td align=right><sub>1945</sub></td>
        <td align=right><sub>11691</sub></td>
        <td align=right><b><sub>172</sub></b></td>
        <td align=right><b><sub>2596</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>425</sub></td>
        <td align=right><sub>1108</sub></td>
        <td align=right><sub>1032</sub></td>
        <td align=right><sub>1019</sub></td>
        <td align=right><sub>1028</sub></td>
        <td align=right><sub>1084</sub></td>
        <td align=right><sub>1105</sub></td>
        <td align=right><sub>1986</sub></td>
        <td align=right><sub>1424</sub></td>
        <td align=right><sub>23500</sub></td>
        <td align=right><b><sub>212</sub></b></td>
        <td align=right><b><sub>1403</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>547</sub></td>
        <td align=right><sub>1001</sub></td>
        <td align=right><sub>958</sub></td>
        <td align=right><sub>954</sub></td>
        <td align=right><sub>837</sub></td>
        <td align=right><sub>843</sub></td>
        <td align=right><sub>888</sub></td>
        <td align=right><sub>1649</sub></td>
        <td align=right><sub>1126</sub></td>
        <td align=right><sub>26081</sub></td>
        <td align=right><b><sub>156</sub></b></td>
        <td align=right><b><sub>1240</sub></b></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>526</sub></td>
        <td align=right><sub>896</sub></td>
        <td align=right><sub>783</sub></td>
        <td align=right><sub>811</sub></td>
        <td align=right><sub>794</sub></td>
        <td align=right><sub>793</sub></td>
        <td align=right><sub>874</sub></td>
        <td align=right><sub>1465</sub></td>
        <td align=right><sub>1091</sub></td>
        <td align=right><sub>23614</sub></td>
        <td align=right><b><sub>168</sub></b></td>
        <td align=right><b><sub>1104</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>658</sub></td>
        <td align=right><sub>833</sub></td>
        <td align=right><sub>789</sub></td>
        <td align=right><sub>782</sub></td>
        <td align=right><sub>779</sub></td>
        <td align=right><sub>793</sub></td>
        <td align=right><sub>804</sub></td>
        <td align=right><sub>1540</sub></td>
        <td align=right><sub>1046</sub></td>
        <td align=right><sub>17795</sub></td>
        <td align=right><b><sub>163</sub></b></td>
        <td align=right><b><sub>1064</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>679</sub></td>
        <td align=right><sub>791</sub></td>
        <td align=right><sub>693</sub></td>
        <td align=right><sub>703</sub></td>
        <td align=right><sub>627</sub></td>
        <td align=right><sub>622</sub></td>
        <td align=right><sub>677</sub></td>
        <td align=right><sub>1077</sub></td>
        <td align=right><sub>818</sub></td>
        <td align=right><sub>5493</sub></td>
        <td align=right><b><sub>87</sub></b></td>
        <td align=right><b><sub>793</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>1112</sub></td>
        <td align=right><sub>442</sub></td>
        <td align=right><sub>434</sub></td>
        <td align=right><sub>432</sub></td>
        <td align=right><sub>432</sub></td>
        <td align=right><sub>437</sub></td>
        <td align=right><sub>443</sub></td>
        <td align=right><sub>830</sub></td>
        <td align=right><sub>568</sub></td>
        <td align=right><sub>11268</sub></td>
        <td align=right><b><sub>158</sub></b></td>
        <td align=right><b><sub>722</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>1376</sub></td>
        <td align=right><sub>436</sub></td>
        <td align=right><sub>408</sub></td>
        <td align=right><sub>409</sub></td>
        <td align=right><sub>409</sub></td>
        <td align=right><sub>406</sub></td>
        <td align=right><sub>441</sub></td>
        <td align=right><sub>731</sub></td>
        <td align=right><sub>553</sub></td>
        <td align=right><sub>4811</sub></td>
        <td align=right><b><sub>80</sub></b></td>
        <td align=right><b><sub>548</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>4426</sub></td>
        <td align=right><sub>158</sub></td>
        <td align=right><sub>153</sub></td>
        <td align=right><sub>153</sub></td>
        <td align=right><sub>157</sub></td>
        <td align=right><sub>153</sub></td>
        <td align=right><sub>160</sub></td>
        <td align=right><sub>293</sub></td>
        <td align=right><sub>205</sub></td>
        <td align=right><sub>1721</sub></td>
        <td align=right><b><sub>37</sub></b></td>
        <td align=right><b><sub>225</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>3111</sub></td>
        <td align=right><sub>82</sub></td>
        <td align=right><sub>63</sub></td>
        <td align=right><sub>63</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>77</sub></td>
        <td align=right><sub>118</sub></td>
        <td align=right><sub>95</sub></td>
        <td align=right><sub>1126</sub></td>
        <td align=right><b><sub>45</sub></b></td>
        <td align=right><b><sub>168</sub></b></td>
    </tr>
</table>

#### Non-Keyed

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align=center><sub>KB</sub></td>
        <td align=center><sub>RAM</sub></td>
        <td align=center><sub>Create</sub></td>
        <td align=center><sub>Replace</sub></td>
        <td align=center><sub>Update</sub></td>
        <td align=center><sub>Order</sub></td>
        <td align=center><sub>Repaint</sub></td>
        <td align=center><sub>Append</sub></td>
        <td align=center><sub>Remove</sub></td>
        <td align=center><sub>Toggle</sub></td>
        <td align=center><sub>Clear</sub></td>
        <td align=center><sub>Index</sub></td>
        <td align=center><sub>Score</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align=right><sub>2.8</sub></td>
        <td align=right><sub>29</sub></td>
        <td align=right><sub>18099</sub></td>
        <td align=right><sub>7877</sub></td>
        <td align=right><sub>221857</sub></td>
        <td align=right><sub>28583</sub></td>
        <td align=right><sub>240062</sub></td>
        <td align=right><sub>32591</sub></td>
        <td align=right><sub>26741</sub></td>
        <td align=right><sub>29389</sub></td>
        <td align=right><sub>25076</sub></td>
        <td align=right><b><sub>996</sub></b></td>
        <td align=right><b><sub>19412</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>115</sub></td>
        <td align=right><sub>1129</sub></td>
        <td align=right><sub>5585</sub></td>
        <td align=right><sub>89514</sub></td>
        <td align=right><sub>15238</sub></td>
        <td align=right><sub>89762</sub></td>
        <td align=right><sub>2386</sub></td>
        <td align=right><sub>22312</sub></td>
        <td align=right><sub>4315</sub></td>
        <td align=right><sub>25699</sub></td>
        <td align=right><b><sub>492</sub></b></td>
        <td align=right><b><sub>6089</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>390</sub></td>
        <td align=right><sub>439</sub></td>
        <td align=right><sub>3870</sub></td>
        <td align=right><sub>41482</sub></td>
        <td align=right><sub>9875</sub></td>
        <td align=right><sub>42550</sub></td>
        <td align=right><sub>899</sub></td>
        <td align=right><sub>8691</sub></td>
        <td align=right><sub>1601</sub></td>
        <td align=right><sub>4827</sub></td>
        <td align=right><b><sub>226</sub></b></td>
        <td align=right><b><sub>2901</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>251</sub></td>
        <td align=right><sub>636</sub></td>
        <td align=right><sub>2071</sub></td>
        <td align=right><sub>4852</sub></td>
        <td align=right><sub>3323</sub></td>
        <td align=right><sub>4926</sub></td>
        <td align=right><sub>1168</sub></td>
        <td align=right><sub>6748</sub></td>
        <td align=right><sub>1991</sub></td>
        <td align=right><sub>11762</sub></td>
        <td align=right><b><sub>194</sub></b></td>
        <td align=right><b><sub>1233</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>346</sub></td>
        <td align=right><sub>739</sub></td>
        <td align=right><sub>684</sub></td>
        <td align=right><sub>5687</sub></td>
        <td align=right><sub>4008</sub></td>
        <td align=right><sub>5842</sub></td>
        <td align=right><sub>1292</sub></td>
        <td align=right><sub>5696</sub></td>
        <td align=right><sub>2255</sub></td>
        <td align=right><sub>13026</sub></td>
        <td align=right><b><sub>183</sub></b></td>
        <td align=right><b><sub>1194</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>316</sub></td>
        <td align=right><sub>435</sub></td>
        <td align=right><sub>2292</sub></td>
        <td align=right><sub>4317</sub></td>
        <td align=right><sub>3293</sub></td>
        <td align=right><sub>4319</sub></td>
        <td align=right><sub>833</sub></td>
        <td align=right><sub>6018</sub></td>
        <td align=right><sub>1459</sub></td>
        <td align=right><sub>12179</sub></td>
        <td align=right><b><sub>229</sub></b></td>
        <td align=right><b><sub>1181</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>524</sub></td>
        <td align=right><sub>1002</sub></td>
        <td align=right><sub>965</sub></td>
        <td align=right><sub>975</sub></td>
        <td align=right><sub>845</sub></td>
        <td align=right><sub>850</sub></td>
        <td align=right><sub>882</sub></td>
        <td align=right><sub>1595</sub></td>
        <td align=right><sub>1132</sub></td>
        <td align=right><sub>26323</sub></td>
        <td align=right><b><sub>158</sub></b></td>
        <td align=right><b><sub>809</sub></b></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>555</sub></td>
        <td align=right><sub>954</sub></td>
        <td align=right><sub>826</sub></td>
        <td align=right><sub>841</sub></td>
        <td align=right><sub>831</sub></td>
        <td align=right><sub>826</sub></td>
        <td align=right><sub>895</sub></td>
        <td align=right><sub>1559</sub></td>
        <td align=right><sub>1154</sub></td>
        <td align=right><sub>24731</sub></td>
        <td align=right><b><sub>173</sub></b></td>
        <td align=right><b><sub>775</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>1366</sub></td>
        <td align=right><sub>154</sub></td>
        <td align=right><sub>1293</sub></td>
        <td align=right><sub>7780</sub></td>
        <td align=right><sub>2906</sub></td>
        <td align=right><sub>7844</sub></td>
        <td align=right><sub>329</sub></td>
        <td align=right><sub>2899</sub></td>
        <td align=right><sub>600</sub></td>
        <td align=right><sub>1751</sub></td>
        <td align=right><b><sub>81</sub></b></td>
        <td align=right><b><sub>752</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>685</sub></td>
        <td align=right><sub>833</sub></td>
        <td align=right><sub>769</sub></td>
        <td align=right><sub>786</sub></td>
        <td align=right><sub>786</sub></td>
        <td align=right><sub>786</sub></td>
        <td align=right><sub>797</sub></td>
        <td align=right><sub>1513</sub></td>
        <td align=right><sub>1064</sub></td>
        <td align=right><sub>14254</sub></td>
        <td align=right><b><sub>150</sub></b></td>
        <td align=right><b><sub>683</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>665</sub></td>
        <td align=right><sub>782</sub></td>
        <td align=right><sub>686</sub></td>
        <td align=right><sub>690</sub></td>
        <td align=right><sub>622</sub></td>
        <td align=right><sub>621</sub></td>
        <td align=right><sub>669</sub></td>
        <td align=right><sub>1072</sub></td>
        <td align=right><sub>827</sub></td>
        <td align=right><sub>5580</sub></td>
        <td align=right><b><sub>88</sub></b></td>
        <td align=right><b><sub>508</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>2767</sub></td>
        <td align=right><sub>84</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>65</sub></td>
        <td align=right><sub>66</sub></td>
        <td align=right><sub>66</sub></td>
        <td align=right><sub>80</sub></td>
        <td align=right><sub>122</sub></td>
        <td align=right><sub>97</sub></td>
        <td align=right><sub>1137</sub></td>
        <td align=right><b><sub>46</sub></b></td>
        <td align=right><b><sub>139</sub></b></td>
    </tr>	
</table>

#### Data-Driven (Internal)

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align=center><sub>KB</sub></td>
        <td align=center><sub>RAM</sub></td>
        <td align=center><sub>Create</sub></td>
        <td align=center><sub>Replace</sub></td>
        <td align=center><sub>Update</sub></td>
        <td align=center><sub>Order</sub></td>
        <td align=center><sub>Repaint</sub></td>
        <td align=center><sub>Append</sub></td>
        <td align=center><sub>Remove</sub></td>
        <td align=center><sub>Toggle</sub></td>
        <td align=center><sub>Clear</sub></td>
        <td align=center><sub>Index</sub></td>
        <td align=center><sub>Score</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align=right><sub>2.8</sub></td>
        <td align=right><sub>16</sub></td>
        <td align=right><sub>17087</sub></td>
        <td align=right><sub>7562</sub></td>
        <td align=right><sub>316248</sub></td>
        <td align=right><sub>29328</sub></td>
        <td align=right><sub>680170</sub></td>
        <td align=right><sub>36341</sub></td>
        <td align=right><sub>27718</sub></td>
        <td align=right><sub>32501</sub></td>
        <td align=right><sub>24671</sub></td>
        <td align=right><b><sub>994</sub></b></td>
        <td align=right><b><sub>43067</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>237</sub></td>
        <td align=right><sub>812</sub></td>
        <td align=right><sub>810</sub></td>
        <td align=right><sub>226830</sub></td>
        <td align=right><sub>21030</sub></td>
        <td align=right><sub>330203</sub></td>
        <td align=right><sub>1639</sub></td>
        <td align=right><sub>19411</sub></td>
        <td align=right><sub>2999</sub></td>
        <td align=right><sub>16572</sub></td>
        <td align=right><b><sub>401</sub></b></td>
        <td align=right><b><sub>20122</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>118</sub></td>
        <td align=right><sub>1089</sub></td>
        <td align=right><sub>4729</sub></td>
        <td align=right><sub>75430</sub></td>
        <td align=right><sub>12666</sub></td>
        <td align=right><sub>83157</sub></td>
        <td align=right><sub>2163</sub></td>
        <td align=right><sub>17250</sub></td>
        <td align=right><sub>3871</sub></td>
        <td align=right><sub>25825</sub></td>
        <td align=right><b><sub>402</sub></b></td>
        <td align=right><b><sub>7701</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>209</sub></td>
        <td align=right><sub>931</sub></td>
        <td align=right><sub>793</sub></td>
        <td align=right><sub>52287</sub></td>
        <td align=right><sub>14491</sub></td>
        <td align=right><sub>56337</sub></td>
        <td align=right><sub>1750</sub></td>
        <td align=right><sub>14239</sub></td>
        <td align=right><sub>3283</sub></td>
        <td align=right><sub>24110</sub></td>
        <td align=right><b><sub>288</sub></b></td>
        <td align=right><b><sub>5377</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>320</sub></td>
        <td align=right><sub>738</sub></td>
        <td align=right><sub>693</sub></td>
        <td align=right><sub>5587</sub></td>
        <td align=right><sub>4024</sub></td>
        <td align=right><sub>5786</sub></td>
        <td align=right><sub>1305</sub></td>
        <td align=right><sub>6379</sub></td>
        <td align=right><sub>2298</sub></td>
        <td align=right><sub>14355</sub></td>
        <td align=right><b><sub>180</sub></b></td>
        <td align=right><b><sub>1420</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>337</sub></td>
        <td align=right><sub>635</sub></td>
        <td align=right><sub>614</sub></td>
        <td align=right><sub>4724</sub></td>
        <td align=right><sub>3312</sub></td>
        <td align=right><sub>4795</sub></td>
        <td align=right><sub>1121</sub></td>
        <td align=right><sub>6543</sub></td>
        <td align=right><sub>1973</sub></td>
        <td align=right><sub>11917</sub></td>
        <td align=right><b><sub>162</sub></b></td>
        <td align=right><b><sub>1248</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>507</sub></td>
        <td align=right><sub>994</sub></td>
        <td align=right><sub>962</sub></td>
        <td align=right><sub>968</sub></td>
        <td align=right><sub>843</sub></td>
        <td align=right><sub>842</sub></td>
        <td align=right><sub>851</sub></td>
        <td align=right><sub>1683</sub></td>
        <td align=right><sub>1145</sub></td>
        <td align=right><sub>26462</sub></td>
        <td align=right><b><sub>151</sub></b></td>
        <td align=right><b><sub>867</sub></b></td>
    </tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>1094</sub></td>
        <td align=right><sub>431</sub></td>
        <td align=right><sub>433</sub></td>
        <td align=right><sub>440</sub></td>
        <td align=right><sub>450</sub></td>
        <td align=right><sub>446</sub></td>
        <td align=right><sub>448</sub></td>
        <td align=right><sub>874</sub></td>
        <td align=right><sub>601</sub></td>
        <td align=right><sub>12489</sub></td>
        <td align=right><b><sub>158</sub></b></td>
        <td align=right><b><sub>561</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>643</sub></td>
        <td align=right><sub>770</sub></td>
        <td align=right><sub>673</sub></td>
        <td align=right><sub>688</sub></td>
        <td align=right><sub>615</sub></td>
        <td align=right><sub>618</sub></td>
        <td align=right><sub>665</sub></td>
        <td align=right><sub>1073</sub></td>
        <td align=right><sub>824</sub></td>
        <td align=right><sub>5301</sub></td>
        <td align=right><b><sub>82</sub></b></td>
        <td align=right><b><sub>545</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>1240</sub></td>
        <td align=right><sub>434</sub></td>
        <td align=right><sub>405</sub></td>
        <td align=right><sub>403</sub></td>
        <td align=right><sub>405</sub></td>
        <td align=right><sub>406</sub></td>
        <td align=right><sub>431</sub></td>
        <td align=right><sub>751</sub></td>
        <td align=right><sub>542</sub></td>
        <td align=right><sub>4797</sub></td>
        <td align=right><b><sub>77</sub></b></td>
        <td align=right><b><sub>392</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>2364</sub></td>
        <td align=right><sub>83</sub></td>
        <td align=right><sub>62</sub></td>
        <td align=right><sub>242</sub></td>
        <td align=right><sub>116</sub></td>
        <td align=right><sub>247</sub></td>
        <td align=right><sub>136</sub></td>
        <td align=right><sub>348</sub></td>
        <td align=right><sub>209</sub></td>
        <td align=right><sub>1082</sub></td>
        <td align=right><b><sub>45</sub></b></td>
        <td align=right><b><sub>174</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>4449</sub></td>
        <td align=right><sub>162</sub></td>
        <td align=right><sub>158</sub></td>
        <td align=right><sub>156</sub></td>
        <td align=right><sub>157</sub></td>
        <td align=right><sub>158</sub></td>
        <td align=right><sub>166</sub></td>
        <td align=right><sub>286</sub></td>
        <td align=right><sub>210</sub></td>
        <td align=right><sub>1973</sub></td>
        <td align=right><b><sub>36</sub></b></td>
        <td align=right><b><sub>167</sub></b></td>
    </tr>
</table>

#### Test goal
This stress test focuses a real life use case, where new data is coming from a source to be rendered through a template (e.g. from a server or by creation during runtime). The different to other benchmark implementations is, that the given task is not known before the data was available.

This test measures the raw rendering performance. If you look for a benchmark which covers more aspects goto here:<br>
https://krausest.github.io/js-framework-benchmark/current.html

#### Local Installation

Go to the folder _bench/_ and install dependencies:
```cmd
npm install
```

Start local webserver:
```cmd
npm run server
```

Go to the URL which displays in the console, e.g. _http://localhost_. The tests will start automatically. Results may differ through various browsers and OS.

#### Score
The score is calculated in relation to the median value of each test. That will keeping the benchmark factor between each library effectively but also vary relationally when new libraries were added.

<code>Score = Sum<sub>test</sub>(lib_ops / median_ops) / test_count * 1000</code>

The file size and memory gets less relevance by applying the square root of these values.

#### Index
The score index is a very stable representation where each score points to a specific place in a ranking table. The maximum possible score and also the best place is 1000, that requires a library to be best in each category (regardless of how much better the factor is, that's the difference to the score value).

<code>Index = Sum<sub>test</sub>(lib_ops / max_ops) / test_count * 1000</code>

The file size and memory gets less relevance by applying the square root of these values.

## Tests
<table>
    <tr></tr>
    <tr>
        <td>Test</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>KB</td>
        <td>The size of the library. This value has less relevance to the score calculation (uses square root).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>RAM</td>
        <td>The amount of memory which was allocated through the whole test (memory per cycle). This value also has less relevance to the score calculation (uses square root).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Create</td>
        <td>The creation of 100 elements from blank.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Replace</td>
        <td>The replacement of 100 new elements over 100 existing elements.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Update</td>
        <td>Update content fields (order of items stay unchanged).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Arrange</td>
        <td>Test re-arrangement, all contents stay unchanged. Toggles between:<br>1. swap second and fore-last item<br>2. re-arrange (4 shifted groups)<br>3. shuffle (on every 5th loop)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Repaint</td>
        <td>Render same items in the same order.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Remove</td>
        <td>The remove of 50 items from a list of 100.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Append</td>
        <td>Append 50 new items to a list of 50 existing.</td>
    </tr>   
    <tr></tr>
    <tr>
        <td>Toggle</td>
        <td>Toggles between "Remove" and "Append" (test for optimizations like: pagination, content folding, list resizing).</td>
    </tr>  
    <tr></tr>
    <tr>
        <td>Clear</td>
        <td>Remove all items from a list of 100 existing.</td>
    </tr>  
</table>

<a name="details"></a>
## How this benchmark work

Basically each framework provide one public method, which handles and render the incoming data, e.g.:

```js
suite["domc"] = function(items){
    scope.items = items;
    root.update(scope);
};
```

or

```js
suite["sinuous"] = function(items){
    data(items);
};
```

The data is unknown, the library does not know if data was added, removed, updated or stay unchanged before it gets the data. That's the main different to other benchmark implementations, where a programmer can iteratively solve a problem to a known task.

Regardless the function is doing, every test has to run through the same logic.

#### Random item factory

The items were created by a random factory. The items comes from a pre-filled pool (5 slots a 100 items), so that keyed libraries get a chance to match same IDs.

Also the items has some fields, which aren't included by the template. That is also important, because in this situation is the most common. Most other benchmarks just provide data which is consumed by the template.

#### Mimic data from a server or created during runtime

The items will be cloned before every test to mimic a fresh fetch from the server or the creation of new items during runtime. The "data-driven" mode disables cloning and perform changes over and over through the same data.

#### Dedicated sandbox

Each test suite runs in its own dedicated sandbox through an iframe. This is reducing noise from externals to a minimum.

#### Hidden render target

You may see benchmarks which draws the rendering visible to the users screen. It depends on what is the desired part to benchmark. This benchmark will just cover the raw time of applied re-calculations (creation/updating/removing of elements), the time the browser takes to make them visible is:

1. no part of this test
2. not relevant, because this time is almost not influenced by the library
3. introduce unnecessary distortion to the test

#### About requirements for tested libraries
1. Each library should provide at least its own features to change DOM. A test implementation should not force to implement something like `node.nodeValue = "..."` or `node.className = "..."` by hand.
The goal is to benchmark library performance and not the performance made by an implementation of a developer. That is probably the biggest different to other benchmark tests.

2. Also asynchronous/scheduled rendering is not allowed.

3. The keyed test requires a largely non-reusing paradigm. When a new item comes from the outside, the library does not reusing nodes (on different keys/IDs).

#### About the test environment

This test also covers runtime optimizations of each library which is very important to produce meaningful results.

<!--
Other benchmarks may re-loading the whole page/application after every single test loop. This would be a good step away from a real environment and also cannot cover one of the biggest strength of Mikado which is based on several runtime optimizations.
-->

#### About median values
Using the median value is very common to normalize the spread in results in a statistically manner. But using the median as benchmark samples, especially when code runs through a VM, the risk is high that the median value is getting back a false result. One thing that is often overseen is the run of the garbage collector, which has a significantly cost and runs randomly. A benchmark which is based on median results will effectively cut out the garbage collector and may produce wrong results. A benchmark based on a best run will absolutely cut off the garbage collector.

This test implementation just using a median to map the results into a normalized scoring index. The results are based on the full computation time including the full run of the garbage collector. That also comes closest to a real environment.

#### About benchmark precision
It is not possible to provide absolute stable browser measuring. There are so many factors which has an impact of benchmarking that it makes no sense in trying to make "synthetic" fixes on things they cannot been fixed. Also every synthetic change may lead into wrong results and false interpreting. For my personal view the best benchmark just uses the browser without any cosmetics. That comes closest to the environment of an user who is using an application.

<!--
That all just become more complex when doing micro-benchmarking. Luckily this workload is by far big enough to produces stable results. Tests where shuffled before start, so you can proof by yourself that values of course differ from one run to another, but produce very stable results. Especially the ___index___ row provides you one of the most stable ranking indexes (the more stable a test is the more meaningful it is). There is absolutely no need for using benchmark.js especially for this workload, also it absolutely does not fit into a real live environment. No place for statistical nonsense, this isn't politics.
-->