<h1>Benchmark of Template Rendering</h1>

Run the benchmark (non-keyed recycle):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/">https://raw.githack.com/nextapps-de/mikado/bench/</a><br>

Run the benchmark (keyed recycle):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#keyed">https://raw.githack.com/nextapps-de/mikado/bench/#keyed</a><br>

Run the benchmark (internal/data-driven):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#internal">https://raw.githack.com/nextapps-de/mikado/bench/#internal</a><br>

There are 3 kinds of test scenarios:

<table>
    <tr>
        <td>1.&nbsp;non-keyed recycle</td>
        <td>In this mode all existing nodes could be reused (recycling nodes). This mode has no restrictions.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>2.&nbsp;keyed recycle</td>
        <td>In this mode just existing nodes sharing the same key (ID) are allowed to be reused. Re-arrangement / reconcile is a feature which is explicitly covered by the test "order".</td>
    </tr>
    <tr></tr>
    <tr>
        <td>3.&nbsp;data-driven</td>
        <td>This mode runs through the same internal pool of data (same references, no new data from external or by creation) and compares the performance gain of data-driven libraries. Especially the test "update" and "repaint" covers the strength of this mode. This mode has no restrictions.</td>
    </tr>
</table>

Whether a library provides optimizations to one of these modes or not, it is fair to compare each of them in a different scenario.

When the option "keep best run" is enabled it will replace the better result with the old one (separately for each test). When disabled, it will summarize the results for each test.

#### Keyed Recycle

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align="center"><sub>Memory</sub></td>
        <td align="center"><sub>Create</sub></td>
        <td align="center"><sub>Replace</sub></td>
        <td align="center"><sub>Update</sub></td>
        <td align="center"><sub>Order</sub></td>
        <td align="center"><sub>Repaint</sub></td>
        <td align="center"><sub>Append</sub></td>
        <td align="center"><sub>Remove</sub></td>
        <td align="center"><sub>Toggle</sub></td>
        <td align="center"><sub>Clear</sub></td>
        <td align="center"><sub>Score</sub></td>
        <td align="center"><sub>Index</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align="right"><sub>56563</sub></td>
        <td align="right"><sub>3589</sub></td>
        <td align="right"><sub>2780</sub></td>
        <td align="right"><sub>199816</sub></td>
        <td align="right"><sub>134262</sub></td>
        <td align="right"><sub>536052</sub></td>
        <td align="right"><sub>93062</sub></td>
        <td align="right"><sub>93058</sub></td>
        <td align="right"><sub>92151</sub></td>
        <td align="right"><sub>51219</sub></td>
        <td align="right"><sub>3202</sub></td>
        <td align="right"><sub>92</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mikado-proxy</sub></td>
        <td align="center"><sub>51350</sub></td>
        <td align="center"><sub>3568</sub></td>
        <td align="center"><sub>2798</sub></td>
        <td align="center"><sub>193514</sub></td>
        <td align="center"><sub>130287</sub></td>
        <td align="center"><sub>493198</sub></td>
        <td align="center"><sub>92700</sub></td>
        <td align="center"><sub>92555</sub></td>
        <td align="center"><sub>91968</sub></td>
        <td align="center"><sub>50792</sub></td>
        <td align="center"><sub>3048</sub></td>
        <td align="center"><sub>91</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mikado-shadow</sub></td>
        <td align="right"><sub>53063</sub></td>
        <td align="right"><sub>3385</sub></td>
        <td align="right"><sub>2784</sub></td>
        <td align="right"><sub>195123</sub></td>
        <td align="right"><sub>128503</sub></td>
        <td align="right"><sub>528433</sub></td>
        <td align="right"><sub>86099</sub></td>
        <td align="right"><sub>86245</sub></td>
        <td align="right"><sub>87774</sub></td>
        <td align="right"><sub>45260</sub></td>
        <td align="right"><sub>3105</sub></td>
        <td align="right"><sub>88</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align="center"><sub>127235</sub></td>
        <td align="center"><sub>3600</sub></td>
        <td align="center"><sub>3424</sub></td>
        <td align="center"><sub>3437</sub></td>
        <td align="center"><sub>3472</sub></td>
        <td align="center"><sub>3512</sub></td>
        <td align="center"><sub>3592</sub></td>
        <td align="center"><sub>6670</sub></td>
        <td align="center"><sub>4540</sub></td>
        <td align="center"><sub>100302</sub></td>
        <td align="center"><sub>120</sub></td>
        <td align="center"><sub>38</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>solid</sub></td>
        <td align="right"><sub>45451</sub></td>
        <td align="right"><sub>2438</sub></td>
        <td align="right"><sub>2230</sub></td>
        <td align="right"><sub>20362</sub></td>
        <td align="right"><sub>13101</sub></td>
        <td align="right"><sub>34436</sub></td>
        <td align="right"><sub>4595</sub></td>
        <td align="right"><sub>24891</sub></td>
        <td align="right"><sub>7858</sub></td>
        <td align="right"><sub>70825</sub></td>
        <td align="right"><sub>312</sub></td>
        <td align="right"><sub>37</sub></td>
    </tr>
    <tr>
        <td><sub>innerHTML</sub></td>
        <td align="center"><sub>68225</sub></td>
        <td align="center"><sub>2791</sub></td>
        <td align="center"><sub>2676</sub></td>
        <td align="center"><sub>2471</sub></td>
        <td align="center"><sub>2823</sub></td>
        <td align="center"><sub>2799</sub></td>
        <td align="center"><sub>2943</sub></td>
        <td align="center"><sub>5752</sub></td>
        <td align="center"><sub>3901</sub></td>
        <td align="center"><sub>103405</sub></td>
        <td align="center"><sub>105</sub></td>
        <td align="center"><sub>35</sub></td>
    </tr>
    <tr>
        <td><sub>stage0</sub></td>
        <td align="right"><sub>57147</sub></td>
        <td align="right"><sub>2030</sub></td>
        <td align="right"><sub>2446</sub></td>
        <td align="right"><sub>11213</sub></td>
        <td align="right"><sub>9749</sub></td>
        <td align="right"><sub>11033</sub></td>
        <td align="right"><sub>4427</sub></td>
        <td align="right"><sub>18083</sub></td>
        <td align="right"><sub>7209</sub></td>
        <td align="right"><sub>90434</sub></td>
        <td align="right"><sub>199</sub></td>
        <td align="right"><sub>35</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align="center"><sub>46992</sub></td>
        <td align="center"><sub>2551</sub></td>
        <td align="center"><sub>2151</sub></td>
        <td align="center"><sub>14722</sub></td>
        <td align="center"><sub>13900</sub></td>
        <td align="center"><sub>16796</sub></td>
        <td align="center"><sub>4780</sub></td>
        <td align="center"><sub>20727</sub></td>
        <td align="center"><sub>7724</sub></td>
        <td align="center"><sub>54176</sub></td>
        <td align="center"><sub>238</sub></td>
        <td align="center"><sub>34</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align="right"><sub>94399</sub></td>
        <td align="right"><sub>2969</sub></td>
        <td align="right"><sub>2577</sub></td>
        <td align="right"><sub>2281</sub></td>
        <td align="right"><sub>2386</sub></td>
        <td align="right"><sub>2379</sub></td>
        <td align="right"><sub>2285</sub></td>
        <td align="right"><sub>4197</sub></td>
        <td align="right"><sub>3023</sub></td>
        <td align="right"><sub>86916</sub></td>
        <td align="right"><sub>91</sub></td>
        <td align="right"><sub>32</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>doohtml</sub></td>
        <td align="center"><sub>72744</sub></td>
        <td align="center"><sub>2397</sub></td>
        <td align="center"><sub>2308</sub></td>
        <td align="center"><sub>2208</sub></td>
        <td align="center"><sub>2208</sub></td>
        <td align="center"><sub>2229</sub></td>
        <td align="center"><sub>2275</sub></td>
        <td align="center"><sub>4285</sub></td>
        <td align="center"><sub>2945</sub></td>
        <td align="center"><sub>63162</sub></td>
        <td align="center"><sub>82</sub></td>
        <td align="center"><sub>29</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align="right"><sub>46322</sub></td>
        <td align="right"><sub>1672</sub></td>
        <td align="right"><sub>1505</sub></td>
        <td align="right"><sub>15406</sub></td>
        <td align="right"><sub>13868</sub></td>
        <td align="right"><sub>16638</sub></td>
        <td align="right"><sub>3599</sub></td>
        <td align="right"><sub>21109</sub></td>
        <td align="right"><sub>5653</sub></td>
        <td align="right"><sub>41525</sub></td>
        <td align="right"><sub>223</sub></td>
        <td align="right"><sub>28</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align="center"><sub>154452</sub></td>
        <td align="center"><sub>2038</sub></td>
        <td align="center"><sub>2112</sub></td>
        <td align="center"><sub>2454</sub></td>
        <td align="center"><sub>2459</sub></td>
        <td align="center"><sub>2461</sub></td>
        <td align="center"><sub>2506</sub></td>
        <td align="center"><sub>4820</sub></td>
        <td align="center"><sub>3276</sub></td>
        <td align="center"><sub>59556</sub></td>
        <td align="center"><sub>81</sub></td>
        <td align="center"><sub>25</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align="right"><sub>83212</sub></td>
        <td align="right"><sub>1517</sub></td>
        <td align="right"><sub>1421</sub></td>
        <td align="right"><sub>10242</sub></td>
        <td align="right"><sub>9614</sub></td>
        <td align="right"><sub>10870</sub></td>
        <td align="right"><sub>2857</sub></td>
        <td align="right"><sub>16062</sub></td>
        <td align="right"><sub>4875</sub></td>
        <td align="right"><sub>28075</sub></td>
        <td align="right"><sub>160</sub></td>
        <td align="right"><sub>22</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align="center"><sub>105835</sub></td>
        <td align="center"><sub>2195</sub></td>
        <td align="center"><sub>1919</sub></td>
        <td align="center"><sub>1893</sub></td>
        <td align="center"><sub>2092</sub></td>
        <td align="center"><sub>2093</sub></td>
        <td align="center"><sub>2084</sub></td>
        <td align="center"><sub>3903</sub></td>
        <td align="center"><sub>2594</sub></td>
        <td align="center"><sub>19220</sub></td>
        <td align="center"><sub>66</sub></td>
        <td align="center"><sub>21</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align="right"><sub>203941</sub></td>
        <td align="right"><sub>1410</sub></td>
        <td align="right"><sub>1329</sub></td>
        <td align="right"><sub>1349</sub></td>
        <td align="right"><sub>1351</sub></td>
        <td align="right"><sub>1333</sub></td>
        <td align="right"><sub>1393</sub></td>
        <td align="right"><sub>2415</sub></td>
        <td align="right"><sub>1764</sub></td>
        <td align="right"><sub>20837</sub></td>
        <td align="right"><sub>46</sub></td>
        <td align="right"><sub>15</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align="center"><sub>1915036</sub></td>
        <td align="center"><sub>739</sub></td>
        <td align="center"><sub>672</sub></td>
        <td align="center"><sub>690</sub></td>
        <td align="center"><sub>686</sub></td>
        <td align="center"><sub>691</sub></td>
        <td align="center"><sub>725</sub></td>
        <td align="center"><sub>1247</sub></td>
        <td align="center"><sub>917</sub></td>
        <td align="center"><sub>7394</sub></td>
        <td align="center"><sub>22</sub></td>
        <td align="center"><sub>7</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align="right"><sub>1107406</sub></td>
        <td align="right"><sub>399</sub></td>
        <td align="right"><sub>289</sub></td>
        <td align="right"><sub>291</sub></td>
        <td align="right"><sub>291</sub></td>
        <td align="right"><sub>280</sub></td>
        <td align="right"><sub>355</sub></td>
        <td align="right"><sub>524</sub></td>
        <td align="right"><sub>429</sub></td>
        <td align="right"><sub>3424</sub></td>
        <td align="right"><sub>12</sub></td>
        <td align="right"><sub>4</sub></td>
    </tr>
</table>

#### Non-Keyed Recycle

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align="center"><sub>Memory</sub></td>
        <td align="center"><sub>Create</sub></td>
        <td align="center"><sub>Replace</sub></td>
        <td align="center"><sub>Update</sub></td>
        <td align="center"><sub>Order</sub></td>
        <td align="center"><sub>Repaint</sub></td>
        <td align="center"><sub>Append</sub></td>
        <td align="center"><sub>Remove</sub></td>
        <td align="center"><sub>Toggle</sub></td>
        <td align="center"><sub>Clear</sub></td>
        <td align="center"><sub>Score</sub></td>
        <td align="center"><sub>Index</sub></td>
    </tr>
    <tr>
        <td><sub>mikado-proxy</sub></td>
        <td align="right"><sub>9448</sub></td>
        <td align="right"><sub>11708</sub></td>
        <td align="right"><sub>13664</sub></td>
        <td align="right"><sub>204224</sub></td>
        <td align="right"><sub>38291</sub></td>
        <td align="right"><sub>513449</sub></td>
        <td align="right"><sub>115120</sub></td>
        <td align="right"><sub>101255</sub></td>
        <td align="right"><sub>106876</sub></td>
        <td align="right"><sub>87582</sub></td>
        <td align="right"><sub>1249</sub></td>
        <td align="right"><sub>97</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align="center"><sub>9479</sub></td>
        <td align="center"><sub>11485</sub></td>
        <td align="center"><sub>13336</sub></td>
        <td align="center"><sub>208089</sub></td>
        <td align="center"><sub>37806</sub></td>
        <td align="center"><sub>525744</sub></td>
        <td align="center"><sub>113557</sub></td>
        <td align="center"><sub>100978</sub></td>
        <td align="center"><sub>107750</sub></td>
        <td align="center"><sub>84743</sub></td>
        <td align="center"><sub>1253</sub></td>
        <td align="center"><sub>97</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mikado-shadow</sub></td>
        <td align="right"><sub>9727</sub></td>
        <td align="right"><sub>11755</sub></td>
        <td align="right"><sub>14277</sub></td>
        <td align="right"><sub>205072</sub></td>
        <td align="right"><sub>37997</sub></td>
        <td align="right"><sub>548344</sub></td>
        <td align="right"><sub>101712</sub></td>
        <td align="right"><sub>94412</sub></td>
        <td align="right"><sub>98744</sub></td>
        <td align="right"><sub>69377</sub></td>
        <td align="right"><sub>1205</sub></td>
        <td align="right"><sub>94</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align="center"><sub>27926</sub></td>
        <td align="center"><sub>3657</sub></td>
        <td align="center"><sub>13326</sub></td>
        <td align="center"><sub>156562</sub></td>
        <td align="center"><sub>34588</sub></td>
        <td align="center"><sub>282703</sub></td>
        <td align="center"><sub>7666</sub></td>
        <td align="center"><sub>83527</sub></td>
        <td align="center"><sub>14674</sub></td>
        <td align="center"><sub>100308</sub></td>
        <td align="center"><sub>487</sub></td>
        <td align="center"><sub>60</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align="right"><sub>55365</sub></td>
        <td align="right"><sub>1374</sub></td>
        <td align="right"><sub>10405</sub></td>
        <td align="right"><sub>82921</sub></td>
        <td align="right"><sub>24495</sub></td>
        <td align="right"><sub>124634</sub></td>
        <td align="right"><sub>2929</sub></td>
        <td align="right"><sub>31184</sub></td>
        <td align="right"><sub>5426</sub></td>
        <td align="right"><sub>20979</sub></td>
        <td align="right"><sub>234</sub></td>
        <td align="right"><sub>31</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>stage0</sub></td>
        <td align="center"><sub>36336</sub></td>
        <td align="center"><sub>2708</sub></td>
        <td align="center"><sub>8394</sub></td>
        <td align="center"><sub>11265</sub></td>
        <td align="center"><sub>10612</sub></td>
        <td align="center"><sub>10852</sub></td>
        <td align="center"><sub>4421</sub></td>
        <td align="center"><sub>17719</sub></td>
        <td align="center"><sub>7172</sub></td>
        <td align="center"><sub>86170</sub></td>
        <td align="center"><sub>115</sub></td>
        <td align="center"><sub>28</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>solid</sub></td>
        <td align="right"><sub>25486</sub></td>
        <td align="right"><sub>2448</sub></td>
        <td align="right"><sub>5569</sub></td>
        <td align="right"><sub>17147</sub></td>
        <td align="right"><sub>11677</sub></td>
        <td align="right"><sub>35531</sub></td>
        <td align="right"><sub>4810</sub></td>
        <td align="right"><sub>28587</sub></td>
        <td align="right"><sub>8140</sub></td>
        <td align="right"><sub>67936</sub></td>
        <td align="right"><sub>138</sub></td>
        <td align="right"><sub>27</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align="center"><sub>26050</sub></td>
        <td align="center"><sub>2185</sub></td>
        <td align="center"><sub>6312</sub></td>
        <td align="center"><sub>15688</sub></td>
        <td align="center"><sub>9999</sub></td>
        <td align="center"><sub>17123</sub></td>
        <td align="center"><sub>4024</sub></td>
        <td align="center"><sub>21084</sub></td>
        <td align="center"><sub>6723</sub></td>
        <td align="center"><sub>39506</sub></td>
        <td align="center"><sub>110</sub></td>
        <td align="center"><sub>23</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align="right"><sub>48519</sub></td>
        <td align="right"><sub>2477</sub></td>
        <td align="right"><sub>2123</sub></td>
        <td align="right"><sub>14532</sub></td>
        <td align="right"><sub>13642</sub></td>
        <td align="right"><sub>16062</sub></td>
        <td align="right"><sub>4596</sub></td>
        <td align="right"><sub>20610</sub></td>
        <td align="right"><sub>7471</sub></td>
        <td align="right"><sub>51747</sub></td>
        <td align="right"><sub>107</sub></td>
        <td align="right"><sub>21</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align="center"><sub>55799</sub></td>
        <td align="center"><sub>1673</sub></td>
        <td align="center"><sub>6465</sub></td>
        <td align="center"><sub>10652</sub></td>
        <td align="center"><sub>9104</sub></td>
        <td align="center"><sub>11339</sub></td>
        <td align="center"><sub>2982</sub></td>
        <td align="center"><sub>17592</sub></td>
        <td align="center"><sub>5187</sub></td>
        <td align="center"><sub>40153</sub></td>
        <td align="center"><sub>88</sub></td>
        <td align="center"><sub>20</sub></td>
    </tr>
    <tr>
        <td><sub>innerHTML</sub></td>
        <td align="right"><sub>75899</sub></td>
        <td align="right"><sub>2812</sub></td>
        <td align="right"><sub>2628</sub></td>
        <td align="right"><sub>2513</sub></td>
        <td align="right"><sub>2814</sub></td>
        <td align="right"><sub>2838</sub></td>
        <td align="right"><sub>2926</sub></td>
        <td align="right"><sub>5745</sub></td>
        <td align="right"><sub>3924</sub></td>
        <td align="right"><sub>93788</sub></td>
        <td align="right"><sub>66</sub></td>
        <td align="right"><sub>19</sub></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align="center"><sub>81645</sub></td>
        <td align="center"><sub>3266</sub></td>
        <td align="center"><sub>2799</sub></td>
        <td align="center"><sub>2668</sub></td>
        <td align="center"><sub>2668</sub></td>
        <td align="center"><sub>2643</sub></td>
        <td align="center"><sub>2952</sub></td>
        <td align="center"><sub>5417</sub></td>
        <td align="center"><sub>3741</sub></td>
        <td align="center"><sub>81977</sub></td>
        <td align="center"><sub>66</sub></td>
        <td align="center"><sub>18</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>doohtml</sub></td>
        <td align="right"><sub>72128</sub></td>
        <td align="right"><sub>2370</sub></td>
        <td align="right"><sub>2302</sub></td>
        <td align="right"><sub>2231</sub></td>
        <td align="right"><sub>2208</sub></td>
        <td align="right"><sub>2254</sub></td>
        <td align="right"><sub>2293</sub></td>
        <td align="right"><sub>4303</sub></td>
        <td align="right"><sub>2982</sub></td>
        <td align="right"><sub>62698</sub></td>
        <td align="right"><sub>53</sub></td>
        <td align="right"><sub>15</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align="center"><sub>135147</sub></td>
        <td align="center"><sub>2398</sub></td>
        <td align="center"><sub>2291</sub></td>
        <td align="center"><sub>2435</sub></td>
        <td align="center"><sub>2428</sub></td>
        <td align="center"><sub>2440</sub></td>
        <td align="center"><sub>2490</sub></td>
        <td align="center"><sub>4757</sub></td>
        <td align="center"><sub>3213</sub></td>
        <td align="center"><sub>57204</sub></td>
        <td align="center"><sub>52</sub></td>
        <td align="center"><sub>14</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align="right"><sub>484025</sub></td>
        <td align="right"><sub>732</sub></td>
        <td align="right"><sub>4688</sub></td>
        <td align="right"><sub>21309</sub></td>
        <td align="right"><sub>9328</sub></td>
        <td align="right"><sub>30835</sub></td>
        <td align="right"><sub>1451</sub></td>
        <td align="right"><sub>10880</sub></td>
        <td align="right"><sub>2598</sub></td>
        <td align="right"><sub>6462</sub></td>
        <td align="right"><sub>75</sub></td>
        <td align="right"><sub>11</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align="center"><sub>97677</sub></td>
        <td align="center"><sub>2193</sub></td>
        <td align="center"><sub>1934</sub></td>
        <td align="center"><sub>1897</sub></td>
        <td align="center"><sub>2096</sub></td>
        <td align="center"><sub>2076</sub></td>
        <td align="center"><sub>2083</sub></td>
        <td align="center"><sub>3852</sub></td>
        <td align="center"><sub>2606</sub></td>
        <td align="center"><sub>19277</sub></td>
        <td align="center"><sub>42</sub></td>
        <td align="center"><sub>10</sub></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align="right"><sub>1100838</sub></td>
        <td align="right"><sub>390</sub></td>
        <td align="right"><sub>281</sub></td>
        <td align="right"><sub>285</sub></td>
        <td align="right"><sub>285</sub></td>
        <td align="right"><sub>285</sub></td>
        <td align="right"><sub>356</sub></td>
        <td align="right"><sub>521</sub></td>
        <td align="right"><sub>421</sub></td>
        <td align="right"><sub>3469</sub></td>
        <td align="right"><sub>8</sub></td>
        <td align="right"><sub>2</sub></td>
    </tr>
</table>																										

<!--
#### Internal (Data-Driven)

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
        <td align=center><sub>Add</sub></td>
        <td align=center><sub>Remove</sub></td>
        <td align=center><sub>Toggle</sub></td>
        <td align=center><sub>Clear</sub></td>
        <td align=center><sub>Index</sub></td>
        <td align=center><sub>Score</sub></td>
    </tr>
    <tr>
        <td><sub>mikado-proxy</sub></td>
        <td align=right><sub>8.3</sub></td>
        <td align=right><sub>18</sub></td>
        <td align=right><sub>7350</sub></td>
        <td align=right><sub>2600</sub></td>
        <td align=right><sub>18467</sub></td>
        <td align=right><sub>11819</sub></td>
        <td align=right><sub>5601305</sub></td>
        <td align=right><sub>10254</sub></td>
        <td align=right><sub>23402</sub></td>
        <td align=right><sub>14499</sub></td>
        <td align=right><sub>18986</sub></td>
        <td align=right><b><sub>551</sub></b></td>
        <td align=right><b><sub>109601</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align=right><sub>3</sub></td>
        <td align=right><sub>15</sub></td>
        <td align=right><sub>18980</sub></td>
        <td align=right><sub>8374</sub></td>
        <td align=right><sub>78140</sub></td>
        <td align=right><sub>49034</sub></td>
        <td align=right><sub>260674</sub></td>
        <td align=right><sub>33723</sub></td>
        <td align=right><sub>27425</sub></td>
        <td align=right><sub>30768</sub></td>
        <td align=right><sub>25797</sub></td>
        <td align=right><b><sub>911</sub></b></td>
        <td align=right><b><sub>17362</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>830</sub></td>
        <td align=right><sub>372</sub></td>
        <td align=right><sub>377</sub></td>
        <td align=right><sub>36533</sub></td>
        <td align=right><sub>38554</sub></td>
        <td align=right><sub>327320</sub></td>
        <td align=right><sub>757</sub></td>
        <td align=right><sub>13058</sub></td>
        <td align=right><sub>1529</sub></td>
        <td align=right><sub>12815</sub></td>
        <td align=right><b><sub>289</sub></b></td>
        <td align=right><b><sub>8431</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>120</sub></td>
        <td align=right><sub>1045</sub></td>
        <td align=right><sub>4841</sub></td>
        <td align=right><sub>40118</sub></td>
        <td align=right><sub>8670</sub></td>
        <td align=right><sub>75694</sub></td>
        <td align=right><sub>2050</sub></td>
        <td align=right><sub>14914</sub></td>
        <td align=right><sub>3703</sub></td>
        <td align=right><sub>22609</sub></td>
        <td align=right><b><sub>373</sub></b></td>
        <td align=right><b><sub>4248</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>203</sub></td>
        <td align=right><sub>995</sub></td>
        <td align=right><sub>836</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>22881</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>1902</sub></td>
        <td align=right><sub>13561</sub></td>
        <td align=right><sub>3480</sub></td>
        <td align=right><sub>20871</sub></td>
        <td align=right><b><sub>311</sub></b></td>
        <td align=right><b><sub>2063</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>285</sub></td>
        <td align=right><sub>779</sub></td>
        <td align=right><sub>751</sub></td>
        <td align=right><sub>5303</sub></td>
        <td align=right><sub>4982</sub></td>
        <td align=right><sub>5901</sub></td>
        <td align=right><sub>1396</sub></td>
        <td align=right><sub>6100</sub></td>
        <td align=right><sub>2363</sub></td>
        <td align=right><sub>14419</sub></td>
        <td align=right><b><sub>184</sub></b></td>
        <td align=right><b><sub>1200</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>1126</sub></td>
        <td align=right><sub>439</sub></td>
        <td align=right><sub>2425</sub></td>
        <td align=right><sub>4139</sub></td>
        <td align=right><sub>3386</sub></td>
        <td align=right><sub>4666</sub></td>
        <td align=right><sub>840</sub></td>
        <td align=right><sub>6389</sub></td>
        <td align=right><sub>1482</sub></td>
        <td align=right><sub>12790</sub></td>
        <td align=right><b><sub>214</sub></b></td>
        <td align=right><b><sub>1170</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>283</sub></td>
        <td align=right><sub>637</sub></td>
        <td align=right><sub>623</sub></td>
        <td align=right><sub>4517</sub></td>
        <td align=right><sub>4056</sub></td>
        <td align=right><sub>4858</sub></td>
        <td align=right><sub>1113</sub></td>
        <td align=right><sub>6664</sub></td>
        <td align=right><sub>1964</sub></td>
        <td align=right><sub>12248</sub></td>
        <td align=right><b><sub>168</sub></b></td>
        <td align=right><b><sub>1046</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerHTML</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>505</sub></td>
        <td align=right><sub>1049</sub></td>
        <td align=right><sub>999</sub></td>
        <td align=right><sub>1003</sub></td>
        <td align=right><sub>871</sub></td>
        <td align=right><sub>874</sub></td>
        <td align=right><sub>875</sub></td>
        <td align=right><sub>1675</sub></td>
        <td align=right><sub>1167</sub></td>
        <td align=right><sub>20810</sub></td>
        <td align=right><b><sub>131</sub></b></td>
        <td align=right><b><sub>794</sub></b></td>
    </tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>548</sub></td>
        <td align=right><sub>798</sub></td>
        <td align=right><sub>692</sub></td>
        <td align=right><sub>690</sub></td>
        <td align=right><sub>642</sub></td>
        <td align=right><sub>646</sub></td>
        <td align=right><sub>677</sub></td>
        <td align=right><sub>1112</sub></td>
        <td align=right><sub>856</sub></td>
        <td align=right><sub>5553</sub></td>
        <td align=right><b><sub>84</sub></b></td>
        <td align=right><b><sub>530</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>1117</sub></td>
        <td align=right><sub>439</sub></td>
        <td align=right><sub>406</sub></td>
        <td align=right><sub>409</sub></td>
        <td align=right><sub>408</sub></td>
        <td align=right><sub>415</sub></td>
        <td align=right><sub>439</sub></td>
        <td align=right><sub>800</sub></td>
        <td align=right><sub>554</sub></td>
        <td align=right><sub>5027</sub></td>
        <td align=right><b><sub>79</sub></b></td>
        <td align=right><b><sub>378</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>1815</sub></td>
        <td align=right><sub>89</sub></td>
        <td align=right><sub>64</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>116</sub></td>
        <td align=right><sub>-failed-</sub></td>
        <td align=right><sub>129</sub></td>
        <td align=right><sub>320</sub></td>
        <td align=right><sub>191</sub></td>
        <td align=right><sub>1056</sub></td>
        <td align=right><b><sub>57</sub></b></td>
        <td align=right><b><sub>196</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>4758</sub></td>
        <td align=right><sub>148</sub></td>
        <td align=right><sub>145</sub></td>
        <td align=right><sub>145</sub></td>
        <td align=right><sub>138</sub></td>
        <td align=right><sub>139</sub></td>
        <td align=right><sub>150</sub></td>
        <td align=right><sub>243</sub></td>
        <td align=right><sub>187</sub></td>
        <td align=right><sub>1434</sub></td>
        <td align=right><b><sub>33</sub></b></td>
        <td align=right><b><sub>146</sub></b></td>
    </tr>	
</table>
-->

#### Test goal
This stress test focuses a real world use case, where new data is coming from a source to be rendered through a template (simulates a server response).
One main difference to other benchmark implementations is, that the given task is not known before the data was available. So it just measure raw library performance instead of the developers' skills.

This test measures raw rendering capabilities of a library. If you look for a benchmark which covers more aspects goto here:<br>
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

The <b>score</b> value is based on median factorization (apply median on average results is fine), here a score of 100 represents the statistical midfield.

<code>Score = Sum<sub>test</sub>(lib_ops / median_ops) / test_count * 100</code>

The memory gets less relevance by applying just the square root of these values to the total score.

#### Index

The <b>index</b> is a stable statistic rank with a maximum possible value of 100, that requires a library to be the best in each test category (regardless how much better).

<code>Index = Sum<sub>test</sub>(lib_ops / max_ops) / test_count * 100</code>

The memory gets less relevance by applying just the square root of these values to the index.

## Tests

Every test will run in its own isolated/dedicated browser instance (iframe) and post back results via message channel.
The benchmark is using fixed randomness (srand) which will apply for every test. So every test has to solve exactly the same task.

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
        <td>Test re-arrangement, all contents stay unchanged. The test toggles between 3 different scenarios of shifted elements.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Repaint</td>
        <td>Render same data in the same order.</td>
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
        <td>Toggles between "Remove" 50 items and "Append" same 50 items (test for optimizations like: pagination, content folding, list resizing).</td>
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

The data is unknown, the library does not know if data was added, removed, updated or stay unchanged before it gets the data. That's the main difference to other benchmark implementations, where a developer can iteratively solve a problem to a known task.

But we won't measure the developer skills, we want to measure pure library performance. Regardless of a specific test case, every test has to run through the same logic.

#### Fixed randomness for the data factory

The data has a fixed randomness (srand), so every library has to solve exactly the same task.

#### Mimic data from a server or created during runtime

The items will be cloned before every test to mimic a fresh fetch from the server or the creation of new items during runtime. The "data-driven" mode disables cloning and perform changes over and over through the same data.

#### Dedicated sandbox

Each test suite runs in its own dedicated sandbox through an iframe. This is reducing noise from externals to a minimum.

#### Measure reflow cycle

The test by default just measure the time it takes to construct and transfer the whole render task to the browser. A library is able to optimize just this specific part. When enabling the option "Force reflow" the benchmark will also measure the time taken by the recalculation (by forcing reflow at the end of each test cycle). Since this part couldn't be optimized by a library it adds way too much unrelated workload to the test and will drastically reduce the potential of getting meaningful results.

#### About requirements for tested libraries

1. Each library should provide at least its own features to change DOM. A test implementation should not force to implement something like `node.nodeValue = "..."` or `node.className = "..."` by hand.
The goal is to benchmark library performance and not the performance made by an implementation of a developer.
2. Also, asynchronous/scheduled rendering is actually not supported (but I can make a support when needed).
3. The keyed and internal (also keyed) test requires a specific paradigm. A component just gets recycled, when a given data key was matched.

#### About the test environment

This test also covers runtime optimizations of each library which is very important to produce meaningful results.

#### About median values

Using the median value is very common to normalize the spread in results in a statistically manner. But using the median as benchmark samples, especially when code runs through a VM, the risk is high that the median value is getting back a false result. One thing that is often overseen is the run of the garbage collector, which has a significantly cost and runs randomly. A benchmark which is based on median results will effectively cut out the garbage collector and leads into wrong results. A benchmark based on the best run will absolutely cut off the garbage collector.

This test implementation is using median factorization for the field "index" to map the results into a normalized scoring rank (0 worst to 100 best). The results are based on the full computation time including the full run of the garbage collector. That also comes closest to a real environment.
