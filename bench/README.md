<h1>Benchmark of Template Rendering</h1>

Run the benchmark (non-keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/">https://raw.githack.com/nextapps-de/mikado/master/bench/</a><br>

Run the benchmark (keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/?keyed">https://raw.githack.com/nextapps-de/mikado/master/bench/?keyed</a><br>

Run the benchmark (internal/data-driven):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/?internal">https://raw.githack.com/nextapps-de/mikado/master/bench/?internal</a><br>

<table>
    <tr>
        <td>non-keyed</td>
        <td>In this mode all existing nodes could be reused.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>keyed</td>
        <td>In this mode just existing nodes with the same key (ID) could be reused/re-arranged.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>internal/data-driven</td>
        <td>This mode runs through the same internal pool of data (same references, no new data from external or by creation) and compares the performance of data-driven paradigm on internal state changes.</td>
    </tr>
</table>

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
        <td align=right><sub>31</sub></td>
        <td align=right><sub>18049</sub></td>
        <td align=right><sub>7818</sub></td>
        <td align=right><sub>38784</sub></td>
        <td align=right><sub>28248</sub></td>
        <td align=right><sub>231732</sub></td>
        <td align=right><sub>31932</sub></td>
        <td align=right><sub>26697</sub></td>
        <td align=right><sub>29195</sub></td>
        <td align=right><sub>24488</sub></td>
        <td align=right><b><sub>991</sub></b></td>
        <td align=right><b><sub>44951</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>327</sub></td>
        <td align=right><sub>737</sub></td>
        <td align=right><sub>685</sub></td>
        <td align=right><sub>4914</sub></td>
        <td align=right><sub>4831</sub></td>
        <td align=right><sub>5717</sub></td>
        <td align=right><sub>1278</sub></td>
        <td align=right><sub>5995</sub></td>
        <td align=right><sub>2219</sub></td>
        <td align=right><sub>14308</sub></td>
        <td align=right><b><sub>200</sub></b></td>
        <td align=right><b><sub>2911</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>230</sub></td>
        <td align=right><sub>646</sub></td>
        <td align=right><sub>632</sub></td>
        <td align=right><sub>3974</sub></td>
        <td align=right><sub>4144</sub></td>
        <td align=right><sub>4856</sub></td>
        <td align=right><sub>1207</sub></td>
        <td align=right><sub>6599</sub></td>
        <td align=right><sub>2013</sub></td>
        <td align=right><sub>12152</sub></td>
        <td align=right><b><sub>190</sub></b></td>
        <td align=right><b><sub>2631</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>429</sub></td>
        <td align=right><sub>1107</sub></td>
        <td align=right><sub>1037</sub></td>
        <td align=right><sub>1036</sub></td>
        <td align=right><sub>1040</sub></td>
        <td align=right><sub>1062</sub></td>
        <td align=right><sub>1134</sub></td>
        <td align=right><sub>1916</sub></td>
        <td align=right><sub>1437</sub></td>
        <td align=right><sub>24521</sub></td>
        <td align=right><b><sub>217</sub></b></td>
        <td align=right><b><sub>1389</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>538</sub></td>
        <td align=right><sub>1022</sub></td>
        <td align=right><sub>985</sub></td>
        <td align=right><sub>867</sub></td>
        <td align=right><sub>855</sub></td>
        <td align=right><sub>860</sub></td>
        <td align=right><sub>881</sub></td>
        <td align=right><sub>1632</sub></td>
        <td align=right><sub>1145</sub></td>
        <td align=right><sub>27099</sub></td>
        <td align=right><b><sub>146</sub></b></td>
        <td align=right><b><sub>1225</sub></b></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>563</sub></td>
        <td align=right><sub>959</sub></td>
        <td align=right><sub>824</sub></td>
        <td align=right><sub>828</sub></td>
        <td align=right><sub>832</sub></td>
        <td align=right><sub>825</sub></td>
        <td align=right><sub>890</sub></td>
        <td align=right><sub>1548</sub></td>
        <td align=right><sub>1131</sub></td>
        <td align=right><sub>24360</sub></td>
        <td align=right><b><sub>172</sub></b></td>
        <td align=right><b><sub>1118</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>674</sub></td>
        <td align=right><sub>835</sub></td>
        <td align=right><sub>803</sub></td>
        <td align=right><sub>820</sub></td>
        <td align=right><sub>803</sub></td>
        <td align=right><sub>792</sub></td>
        <td align=right><sub>783</sub></td>
        <td align=right><sub>1435</sub></td>
        <td align=right><sub>1041</sub></td>
        <td align=right><sub>17636</sub></td>
        <td align=right><b><sub>163</sub></b></td>
        <td align=right><b><sub>1045</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>668</sub></td>
        <td align=right><sub>796</sub></td>
        <td align=right><sub>698</sub></td>
        <td align=right><sub>634</sub></td>
        <td align=right><sub>634</sub></td>
        <td align=right><sub>633</sub></td>
        <td align=right><sub>680</sub></td>
        <td align=right><sub>1089</sub></td>
        <td align=right><sub>834</sub></td>
        <td align=right><sub>5495</sub></td>
        <td align=right><b><sub>89</sub></b></td>
        <td align=right><b><sub>784</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>1096</sub></td>
        <td align=right><sub>443</sub></td>
        <td align=right><sub>438</sub></td>
        <td align=right><sub>439</sub></td>
        <td align=right><sub>436</sub></td>
        <td align=right><sub>440</sub></td>
        <td align=right><sub>450</sub></td>
        <td align=right><sub>806</sub></td>
        <td align=right><sub>589</sub></td>
        <td align=right><sub>11869</sub></td>
        <td align=right><b><sub>160</sub></b></td>
        <td align=right><b><sub>720</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>1336</sub></td>
        <td align=right><sub>440</sub></td>
        <td align=right><sub>407</sub></td>
        <td align=right><sub>407</sub></td>
        <td align=right><sub>405</sub></td>
        <td align=right><sub>406</sub></td>
        <td align=right><sub>429</sub></td>
        <td align=right><sub>710</sub></td>
        <td align=right><sub>541</sub></td>
        <td align=right><sub>4593</sub></td>
        <td align=right><b><sub>80</sub></b></td>
        <td align=right><b><sub>538</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>4708</sub></td>
        <td align=right><sub>162</sub></td>
        <td align=right><sub>154</sub></td>
        <td align=right><sub>155</sub></td>
        <td align=right><sub>155</sub></td>
        <td align=right><sub>155</sub></td>
        <td align=right><sub>161</sub></td>
        <td align=right><sub>297</sub></td>
        <td align=right><sub>207</sub></td>
        <td align=right><sub>1797</sub></td>
        <td align=right><b><sub>37</sub></b></td>
        <td align=right><b><sub>224</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>3247</sub></td>
        <td align=right><sub>87</sub></td>
        <td align=right><sub>63</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>78</sub></td>
        <td align=right><sub>120</sub></td>
        <td align=right><sub>96</sub></td>
        <td align=right><sub>1114</sub></td>
        <td align=right><b><sub>46</sub></b></td>
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
        <td align=right><sub>39198</sub></td>
        <td align=right><sub>28583</sub></td>
        <td align=right><sub>240062</sub></td>
        <td align=right><sub>32591</sub></td>
        <td align=right><sub>26741</sub></td>
        <td align=right><sub>29370</sub></td>
        <td align=right><sub>25076</sub></td>
        <td align=right><b><sub>992</sub></b></td>
        <td align=right><b><sub>15485</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>120</sub></td>
        <td align=right><sub>1144</sub></td>
        <td align=right><sub>5840</sub></td>
        <td align=right><sub>32994</sub></td>
        <td align=right><sub>18298</sub></td>
        <td align=right><sub>95863</sub></td>
        <td align=right><sub>2434</sub></td>
        <td align=right><sub>21874</sub></td>
        <td align=right><sub>4466</sub></td>
        <td align=right><sub>26795</sub></td>
        <td align=right><b><sub>545</sub></b></td>
        <td align=right><b><sub>5139</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>391</sub></td>
        <td align=right><sub>441</sub></td>
        <td align=right><sub>3896</sub></td>
        <td align=right><sub>20134</sub></td>
        <td align=right><sub>11419</sub></td>
        <td align=right><sub>43216</sub></td>
        <td align=right><sub>914</sub></td>
        <td align=right><sub>8430</sub></td>
        <td align=right><sub>1621</sub></td>
        <td align=right><sub>4850</sub></td>
        <td align=right><b><sub>260</sub></b></td>
        <td align=right><b><sub>2500</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>255</sub></td>
        <td align=right><sub>647</sub></td>
        <td align=right><sub>2051</sub></td>
        <td align=right><sub>4211</sub></td>
        <td align=right><sub>3418</sub></td>
        <td align=right><sub>4974</sub></td>
        <td align=right><sub>1197</sub></td>
        <td align=right><sub>6771</sub></td>
        <td align=right><sub>1986</sub></td>
        <td align=right><sub>12096</sub></td>
        <td align=right><b><sub>202</sub></b></td>
        <td align=right><b><sub>1220</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>289</sub></td>
        <td align=right><sub>735</sub></td>
        <td align=right><sub>693</sub></td>
        <td align=right><sub>4976</sub></td>
        <td align=right><sub>5026</sub></td>
        <td align=right><sub>5815</sub></td>
        <td align=right><sub>1318</sub></td>
        <td align=right><sub>5571</sub></td>
        <td align=right><sub>2262</sub></td>
        <td align=right><sub>11852</sub></td>
        <td align=right><b><sub>192</sub></b></td>
        <td align=right><b><sub>1202</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>341</sub></td>
        <td align=right><sub>447</sub></td>
        <td align=right><sub>2423</sub></td>
        <td align=right><sub>4328</sub></td>
        <td align=right><sub>3582</sub></td>
        <td align=right><sub>4652</sub></td>
        <td align=right><sub>856</sub></td>
        <td align=right><sub>6390</sub></td>
        <td align=right><sub>1505</sub></td>
        <td align=right><sub>11047</sub></td>
        <td align=right><b><sub>235</sub></b></td>
        <td align=right><b><sub>1202</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>524</sub></td>
        <td align=right><sub>1025</sub></td>
        <td align=right><sub>992</sub></td>
        <td align=right><sub>879</sub></td>
        <td align=right><sub>868</sub></td>
        <td align=right><sub>879</sub></td>
        <td align=right><sub>912</sub></td>
        <td align=right><sub>1668</sub></td>
        <td align=right><sub>1167</sub></td>
        <td align=right><sub>27340</sub></td>
        <td align=right><b><sub>160</sub></b></td>
        <td align=right><b><sub>835</sub></b></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>601</sub></td>
        <td align=right><sub>936</sub></td>
        <td align=right><sub>811</sub></td>
        <td align=right><sub>827</sub></td>
        <td align=right><sub>827</sub></td>
        <td align=right><sub>825</sub></td>
        <td align=right><sub>922</sub></td>
        <td align=right><sub>1497</sub></td>
        <td align=right><sub>1129</sub></td>
        <td align=right><sub>24572</sub></td>
        <td align=right><b><sub>170</sub></b></td>
        <td align=right><b><sub>770</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>1324</sub></td>
        <td align=right><sub>164</sub></td>
        <td align=right><sub>1325</sub></td>
        <td align=right><sub>5210</sub></td>
        <td align=right><sub>3283</sub></td>
        <td align=right><sub>8054</sub></td>
        <td align=right><sub>336</sub></td>
        <td align=right><sub>2846</sub></td>
        <td align=right><sub>600</sub></td>
        <td align=right><sub>1678</sub></td>
        <td align=right><b><sub>92</sub></b></td>
        <td align=right><b><sub>712</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>644</sub></td>
        <td align=right><sub>831</sub></td>
        <td align=right><sub>748</sub></td>
        <td align=right><sub>762</sub></td>
        <td align=right><sub>763</sub></td>
        <td align=right><sub>758</sub></td>
        <td align=right><sub>785</sub></td>
        <td align=right><sub>1485</sub></td>
        <td align=right><sub>1021</sub></td>
        <td align=right><sub>13925</sub></td>
        <td align=right><b><sub>149</sub></b></td>
        <td align=right><b><sub>675</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>612</sub></td>
        <td align=right><sub>774</sub></td>
        <td align=right><sub>696</sub></td>
        <td align=right><sub>626</sub></td>
        <td align=right><sub>633</sub></td>
        <td align=right><sub>635</sub></td>
        <td align=right><sub>678</sub></td>
        <td align=right><sub>1081</sub></td>
        <td align=right><sub>830</sub></td>
        <td align=right><sub>5536</sub></td>
        <td align=right><b><sub>89</sub></b></td>
        <td align=right><b><sub>509</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>2607</sub></td>
        <td align=right><sub>89</sub></td>
        <td align=right><sub>65</sub></td>
        <td align=right><sub>65</sub></td>
        <td align=right><sub>65</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>77</sub></td>
        <td align=right><sub>128</sub></td>
        <td align=right><sub>100</sub></td>
        <td align=right><sub>1133</sub></td>
        <td align=right><b><sub>46</sub></b></td>
        <td align=right><b><sub>141</sub></b></td>
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
        <td align=right><sub>10</sub></td>
        <td align=right><sub>18721</sub></td>
        <td align=right><sub>7878</sub></td>
        <td align=right><sub>38217</sub></td>
        <td align=right><sub>28117</sub></td>
        <td align=right><sub>240953</sub></td>
        <td align=right><sub>31894</sub></td>
        <td align=right><sub>26867</sub></td>
        <td align=right><sub>29601</sub></td>
        <td align=right><sub>24735</sub></td>
        <td align=right><b><sub>943</sub></b></td>
        <td align=right><b><sub>40122</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>241</sub></td>
        <td align=right><sub>797</sub></td>
        <td align=right><sub>774</sub></td>
        <td align=right><sub>38595</sub></td>
        <td align=right><sub>41287</sub></td>
        <td align=right><sub>302143</sub></td>
        <td align=right><sub>1531</sub></td>
        <td align=right><sub>19813</sub></td>
        <td align=right><sub>2900</sub></td>
        <td align=right><sub>10344</sub></td>
        <td align=right><b><sub>474</sub></b></td>
        <td align=right><b><sub>38418</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>204</sub></td>
        <td align=right><sub>935</sub></td>
        <td align=right><sub>799</sub></td>
        <td align=right><sub>20899</sub></td>
        <td align=right><sub>23777</sub></td>
        <td align=right><sub>56879</sub></td>
        <td align=right><sub>1839</sub></td>
        <td align=right><sub>12361</sub></td>
        <td align=right><sub>3268</sub></td>
        <td align=right><sub>23974</sub></td>
        <td align=right><b><sub>328</sub></b></td>
        <td align=right><b><sub>11389</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>381</sub></td>
        <td align=right><sub>705</sub></td>
        <td align=right><sub>663</sub></td>
        <td align=right><sub>4796</sub></td>
        <td align=right><sub>4659</sub></td>
        <td align=right><sub>5702</sub></td>
        <td align=right><sub>1234</sub></td>
        <td align=right><sub>6063</sub></td>
        <td align=right><sub>2134</sub></td>
        <td align=right><sub>14405</sub></td>
        <td align=right><b><sub>180</sub></b></td>
        <td align=right><b><sub>2514</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>284</sub></td>
        <td align=right><sub>624</sub></td>
        <td align=right><sub>602</sub></td>
        <td align=right><sub>3863</sub></td>
        <td align=right><sub>4010</sub></td>
        <td align=right><sub>4788</sub></td>
        <td align=right><sub>1135</sub></td>
        <td align=right><sub>6508</sub></td>
        <td align=right><sub>1954</sub></td>
        <td align=right><sub>11925</sub></td>
        <td align=right><b><sub>166</sub></b></td>
        <td align=right><b><sub>2247</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>429</sub></td>
        <td align=right><sub>1107</sub></td>
        <td align=right><sub>1037</sub></td>
        <td align=right><sub>1036</sub></td>
        <td align=right><sub>1040</sub></td>
        <td align=right><sub>1062</sub></td>
        <td align=right><sub>1134</sub></td>
        <td align=right><sub>1916</sub></td>
        <td align=right><sub>1437</sub></td>
        <td align=right><sub>24521</sub></td>
        <td align=right><b><sub>204</sub></b></td>
        <td align=right><b><sub>1292</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>494</sub></td>
        <td align=right><sub>1006</sub></td>
        <td align=right><sub>965</sub></td>
        <td align=right><sub>842</sub></td>
        <td align=right><sub>841</sub></td>
        <td align=right><sub>844</sub></td>
        <td align=right><sub>869</sub></td>
        <td align=right><sub>1634</sub></td>
        <td align=right><sub>1122</sub></td>
        <td align=right><sub>27188</sub></td>
        <td align=right><b><sub>149</sub></b></td>
        <td align=right><b><sub>1133</sub></b></td>
    </tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>602</sub></td>
        <td align=right><sub>778</sub></td>
        <td align=right><sub>681</sub></td>
        <td align=right><sub>622</sub></td>
        <td align=right><sub>618</sub></td>
        <td align=right><sub>621</sub></td>
        <td align=right><sub>654</sub></td>
        <td align=right><sub>1067</sub></td>
        <td align=right><sub>813</sub></td>
        <td align=right><sub>5311</sub></td>
        <td align=right><b><sub>79</sub></b></td>
        <td align=right><b><sub>708</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>904</sub></td>
        <td align=right><sub>433</sub></td>
        <td align=right><sub>429</sub></td>
        <td align=right><sub>430</sub></td>
        <td align=right><sub>427</sub></td>
        <td align=right><sub>429</sub></td>
        <td align=right><sub>441</sub></td>
        <td align=right><sub>834</sub></td>
        <td align=right><sub>572</sub></td>
        <td align=right><sub>12430</sub></td>
        <td align=right><b><sub>156</sub></b></td>
        <td align=right><b><sub>682</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>1297</sub></td>
        <td align=right><sub>430</sub></td>
        <td align=right><sub>398</sub></td>
        <td align=right><sub>401</sub></td>
        <td align=right><sub>401</sub></td>
        <td align=right><sub>403</sub></td>
        <td align=right><sub>414</sub></td>
        <td align=right><sub>755</sub></td>
        <td align=right><sub>535</sub></td>
        <td align=right><sub>4744</sub></td>
        <td align=right><b><sub>74</sub></b></td>
        <td align=right><b><sub>494</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>2170</sub></td>
        <td align=right><sub>88</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>150</sub></td>
        <td align=right><sub>128</sub></td>
        <td align=right><sub>243</sub></td>
        <td align=right><sub>139</sub></td>
        <td align=right><sub>355</sub></td>
        <td align=right><sub>206</sub></td>
        <td align=right><sub>1104</sub></td>
        <td align=right><b><sub>44</sub></b></td>
        <td align=right><b><sub>222</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>4612</sub></td>
        <td align=right><sub>163</sub></td>
        <td align=right><sub>157</sub></td>
        <td align=right><sub>157</sub></td>
        <td align=right><sub>157</sub></td>
        <td align=right><sub>159</sub></td>
        <td align=right><sub>166</sub></td>
        <td align=right><sub>286</sub></td>
        <td align=right><sub>210</sub></td>
        <td align=right><sub>1852</sub></td>
        <td align=right><b><sub>34</sub></b></td>
        <td align=right><b><sub>208</sub></b></td>
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
        <td>Toggles between:<br>1. shuffle item indexes (all contents stay unchanged)<br>2. update content fields of every nth item (order of items stay unchanged)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Arrange</td>
        <td>Toggles between:<br>1. swap second and fore-last item<br>2. re-arrange (4 shifted groups)</td>
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
        <td>Remove all items of a list of 100 existing.</td>
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